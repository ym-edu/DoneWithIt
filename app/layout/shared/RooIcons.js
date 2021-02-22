/**
 * RooIcons icon set component.
 * Usage: <RooIcons name="icon-name" size={20} color="#4F8EF7" />
 */

import { createIconSet } from '@expo/vector-icons';
const glyphMap = {
  "angle": 59392,
  "close": 59393,
  "edit-page": 59394,
  "edit": 59395,
  "explore": 59396,
  "flex": 59397,
  "grip": 59398,
  "home": 59399,
  "layer-minus": 59400,
  "layer-plus": 59401,
  "layer": 59402,
  "lock": 59403,
  "media-empty": 59404,
  "minus": 59405,
  "plus": 59406,
  "search": 59407,
  "stats": 59408,
  "stopwatch": 59409,
  "trash": 59410
};

const iconSet = createIconSet(glyphMap, 'RooIcons');

export default iconSet;
export const {
  Button,
  getImageSource,
  getImageSourceSync,
} = iconSet;
