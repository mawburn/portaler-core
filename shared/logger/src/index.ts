import { S3 } from 'aws-sdk'
import { ClientConfiguration } from 'aws-sdk/clients/acm'
import fs from 'fs'
import path from 'path'
import winston, { Logger } from 'winston'

interface S3Creds {
  client: ClientConfiguration
  params: {
    Bucket: string
    Key: string
    Body: string
  }
}

export default class LoggingService {
  logger: Logger
  s3: S3 | null
  uploadTimer: number
  interval: NodeJS.Timeout | undefined
  logPath: string

  constructor(service: string, awsCreds?: S3Creds, uploadTimerInMs?: number) {
    this.logPath = path.join(__dirname, '/serverlogs')

    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath)
    }

    this.logger = winston.createLogger({
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
    this.uploadTimer = uploadTimerInMs ?? 60 * 60 * 1000 // 1hr default
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
      fs.readdirSync(this.logPath, (err: Error, filenames: string[]) => {
        if (err) {
          console.error(err)
          return
        }

        filenames.forEach((filename: string) => {
          fs.readFileSync(
            path.join(this.logPath, filename),
            'utf-8',
            (err, content) => {
              if (err) {
                console.error(err)
              }
            }
          )
        })
      })
    }, this.uploadTimer)
}
