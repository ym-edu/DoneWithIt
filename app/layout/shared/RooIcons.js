/**
 * RooIcons icon set component.
 * Usage: <RooIcons name="icon-name" size={20} color="#4F8EF7" />
 */

 import { createIconSet } from '@expo/vector-icons';
const glyphMap = {
  "angle": 59392,
  "arrow": 59393,
  "close": 59394,
  "dots": 59395,
  "edit-page": 59396,
  "edit": 59397,
  "exercises": 59398,
  "explore": 59399,
  "flex": 59400,
  "grip": 59401,
  "history": 59402,
  "home": 59403,
  "medal": 59404,
  "layer-minus": 59405,
  "layer-plus": 59406,
  "layer": 59407,
  "lock": 59408,
  "media-empty": 59409,
  "minus": 59410,
  "plus": 59411,
  "redo": 59412,
  "search": 59413,
  "stats": 59414,
  "stopwatch": 59415,
  "trash": 59416
};

const iconSet = createIconSet(glyphMap, 'RooIcons');

export default iconSet;
export const {
  Button,
  getImageSource,
  getImageSourceSync,
} = iconSet;
