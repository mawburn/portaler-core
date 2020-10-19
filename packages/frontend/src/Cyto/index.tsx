import './styles.css';

import cytoscape, { CytoscapeOptions } from 'cytoscape';
import COSEBilkent from 'cytoscape-cose-bilkent';
import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Portal, Zone } from '../types';
import { changeScore } from './cytoUtils';
import defaultSettings from './defaultSettings';
import graphStyle from './graphStyle';
import { portalSizeToColor, zoneColorToColor } from './mapStyle';

cytoscape.use(COSEBilkent);

interface CytoProps {
  isDark: boolean;
  zones: Zone[];
  portals: Portal[];
  onNodeClick: (name: string) => void;
}

interface CytoMapElement {
  added: boolean;
  element: object;
}

const Cyto: FC<CytoProps> = ({ isDark, portals, zones, onNodeClick }) => {
  const oldScore = useRef<number>(-1);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const cy = useRef<any>(null);
  const elements = useRef<Map<string, CytoMapElement>>(new Map());

  const [score, setScore] = useState<number>(-1);
  const [remove, setRemove] = useState<string[]>([]);

  const cyEventHandler = useCallback(
    (e: cytoscape.EventObject) => {
      onNodeClick(e.target.data('zoneName'));
    },
    [onNodeClick]
  );

  useEffect(() => {
    if (!cy.current) {
      cy.current = cytoscape({
        ...defaultSettings,
        style: graphStyle(isDark),
        container: containerRef.current,
      } as CytoscapeOptions);

      cy.current.on('tap', 'node', cyEventHandler);
    } else {
      cy.current.style(graphStyle(isDark));
    }
  }, [isDark, cyEventHandler]);

  const filteredZones = useMemo(
    () =>
      zones.filter(
        (z) =>
          !!portals?.find((p) => p.source === z.name || p.target === z.name)
      ),
    [zones, portals]
  );

  useEffect(() => {
    const elms = elements.current;
    const allKeys: string[] = [];

    if (filteredZones.length) {
      filteredZones.forEach((z) => {
        // used to add portals first
        const id = 'azone' + z.name.toLowerCase().replace(/ /g, '');
        allKeys.push(id);

        if (!elms.has(id)) {
          elms.set(id, {
            added: false,
            element: {
              data: { id, zoneName: z.name, label: z.name },
              style: {
                backgroundColor: zoneColorToColor[z.color],
                shape: z.type.indexOf('TUNNEL_HIDEOUT') >= 0 ? 'pentagon' : '',
              },
            },
          });
        }
      });

      portals.forEach((p) => {
        const source = 'azone' + p.source.toLowerCase().replace(/ /g, '');
        const target = 'azone' + p.target.toLowerCase().replace(/ /g, '');

        // just to fix the score if the characteres end up being the same, add k e y
        const id = `edge${source}${target}`;
        allKeys.push(id);

        const label = `${Math.floor(p.timeLeft / 60)}h ${Math.round(
          p.timeLeft % 60
        )}m`;

        if (!elms.has(id)) {
          elms.set(id, {
            added: false,
            element: {
              data: {
                id,
                source,
                target,
                label,
              },
              classes: p.timeLeft < 30 ? 'timeLow' : '',
              style: {
                lineColor: portalSizeToColor[p.size],
              },
            },
          });
        } else {
          const updateElm = cy.current.$(`#${id}`);
          updateElm.data('label', label);

          if (p.timeLeft < 30) {
            updateElm.addClass('timeLow');
          }
        }
      });

      const removeKeys: string[] = Array.from(elms.keys()).filter(
        (k) => !allKeys.includes(k)
      );

      if (removeKeys.length) {
        setRemove(removeKeys);
      }

      setScore(changeScore(allKeys));
    }
  }, [filteredZones, portals]);

  useEffect(() => {
    if (score !== oldScore.current) {
      const elms = elements.current;

      // make sure we add the zones first, before the connetions
      const elmKeys = Array.from(elms.keys()).sort((a, b) =>
        a.localeCompare(b)
      );

      // @ts-ignore
      console.log(elmKeys); // eslint-disable-line

      let updated = false;

      elmKeys.forEach((key) => {
        const elm = elms.get(key);

        if (elm && !elm.added) {
          cy.current.add(elm.element);
          elms.set(key, { added: true, element: { ...elm.element } });
          updated = true;
        }
      });

      if (remove.length) {
        remove.forEach((k) => {
          cy.current.remove(cy.current.$(`#${k}`));
          elements.current.delete(k);
        });

        updated = true;
        setRemove([]);
      }

      if (updated) {
        cy.current.layout(defaultSettings.layout).run();
      }

      oldScore.current = score;
    }
  }, [score, remove]);

  return (
    <div className="cyto">
      <div ref={containerRef} />
    </div>
  );
};

export default Cyto;
