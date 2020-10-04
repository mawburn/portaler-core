import './MappingBar.css';

import React, {
  FC,
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Button, FormControl, FormLabel, TextField } from '@material-ui/core';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';

import { PortalSize, Zone } from '../types';
import PortalSizeSelector from './PortalSizeSelector';
import ZoneSearch from './ZoneSearch';
import useAddPortal from './useAddPortal';

interface MappingBarProps {
  zones: Zone[];
  fromId: string | null;
  token: string;
  updatePortals: () => void;
}

const DEFAULT_PORTAL_SIZE = 7;

const sorter = (a: string, b: string) =>
  a.toUpperCase().localeCompare(b.toUpperCase());

const MappingBar: FC<MappingBarProps> = ({
  zones,
  fromId,
  token,
  updatePortals,
}) => {
  const oldFromId = useRef<string | null>(fromId);
  const [from, setFrom] = useState<string | null>(null);
  const [to, setTo] = useState<string | null>(null);
  const [portalSize, setPortalSize] = useState<PortalSize>(DEFAULT_PORTAL_SIZE);
  const [hours, setHours] = useState<number | null>(null);
  const [minutes, setMinutes] = useState<number | null>(null);

  const zoneNames = useMemo<string[]>(
    () => zones.map((n) => n.name).sort(sorter),
    [zones]
  );

  const addPortal = useAddPortal(token, updatePortals);

  const filteredFrom = useMemo<string[]>(
    () => zoneNames.filter((z) => z !== to),
    [to, zoneNames]
  );

  const filteredTo = useMemo<string[]>(
    () => zoneNames.filter((z) => z !== from),
    [from, zoneNames]
  );

  useEffect(() => {
    if (fromId !== oldFromId.current) {
      setFrom(fromId);
      oldFromId.current = fromId;
    }
  }, [fromId, setFrom]);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
        const hr = Number(hours);
        const min = Number(minutes);

        if (from && to && portalSize && hr + min > 0) {
          addPortal(from, to, portalSize, hr, min);
          setTo(null);
          setHours(null);
          setMinutes(null);
          setPortalSize(DEFAULT_PORTAL_SIZE);
        } else {
          throw new Error('you suck');
        }
      } catch (err) {
        console.error(err);
      }
    },
    [from, to, portalSize, hours, minutes, addPortal]
  );

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <div className="mapping-bar">
        <div className="row">
          <ZoneSearch
            value={from}
            update={setFrom}
            label="From"
            zoneNames={filteredFrom}
          />
        </div>
        <div className="row">
          <ZoneSearch
            value={to}
            update={setTo}
            label="To"
            zoneNames={filteredTo}
          />
        </div>
        <div className="row">
          <PortalSizeSelector size={portalSize} update={setPortalSize} />
        </div>
        <div className="row">
          <FormControl fullWidth component="fieldset">
            <FormLabel component="legend">Time Left</FormLabel>
            <div className="flex-column">
              <TextField
                id="time-hour"
                className="duration-field"
                type="number"
                label="Hour(s)"
                InputProps={{
                  inputProps: { min: 0, max: 24 },
                  value: hours || '',
                }}
                onChange={(e) => setHours(Number(e.currentTarget.value))}
              />
              <TextField
                id="time-minute"
                className="duration-field"
                type="number"
                label="Minute(s)"
                InputProps={{
                  inputProps: { min: 0, max: 59 },
                  value: minutes || '',
                }}
                onChange={(e) => setMinutes(Number(e.currentTarget.value))}
              />
            </div>
          </FormControl>
        </div>
        <div className="row">
          <FormControl fullWidth>
            <Button
              className="create-btn"
              variant="contained"
              color="primary"
              type="submit"
              endIcon={<DeviceHubIcon />}
              size="large"
            >
              Create Connection
            </Button>
          </FormControl>
        </div>
      </div>
    </form>
  );
};

export default MappingBar;
