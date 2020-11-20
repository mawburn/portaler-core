import { S3 } from 'aws-sdk'
import { ClientConfiguration } from 'aws-sdk/clients/acm'
import fs from 'fs'
import { DateTime } from 'luxon'
import path from 'path'
import winston, { Logger } from 'winston'

export interface S3Creds {
  client: ClientConfiguration
  bucket: string
}

const oneHrMs = 60 * 60 * 1000
export default class LoggingService {
  log: Logger
  interval: NodeJS.Timeout | undefined

  private s3: S3 | null
  private uploadTimer: number
  private logPath: string
  private bucket: string | undefined

  /**
   * @param  service Name of the service using the logger
   * @param  awsCreds credentials
   * @param  uploadHours how often in hours
   */
  constructor(service: string, awsCreds?: S3Creds, uploadHours: number = 1) {
    this.logPath = path.join(__dirname, '/serverlogs')

    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath)
    }

    this.log = winston.createLogger({
      format: winston.format.json(),
      defaultMeta: { service, timestamp: Date.now() },
      transports: [
        new winston.transports.File({
          filename: path.join(this.logPath, `${service}-error.log`),
          level: 'error',
        }),
        new winston.transports.File({
          filename: path.join(this.logPath, `${service}-warn.log`),
          level: 'warn',
        }),
        new winston.transports.Console({
          format: winston.format.simple(),
        }),
      ],
    })

    this.s3 = awsCreds ? new S3(awsCreds.client) : null
    this.bucket = awsCreds?.bucket
    this.uploadTimer = uploadHours * oneHrMs
  }

  startUploader = () => {
    if (this.s3) {
      this.interval = this.uploader()
    }
  }

  stopUploader = () => {
    if (this.interval) {
      clearInterval(this.interval)
    }
  }

  private uploader = () =>
    setInterval(() => {
      const now = DateTime.utc().toISO({
        suppressMilliseconds: true,
        includeOffset: false,
      })

      fs.readdir(this.logPath, (err: Error | null, filenames: string[]) => {
        if (err) {
          console.error(err)
          return
        }

        filenames.forEach(async (filename: string) => {
          const file = fs.readFileSync(path.join(this.logPath, filename), {
            encoding: 'utf-8',
          })

          await this.s3?.upload({
            Bucket: this.bucket!,
            ACL: 'private',
            Key: `/errors/${filename}_${now}`,
            Body: file,
          })
        })
      })
    }, this.uploadTimer)
}
