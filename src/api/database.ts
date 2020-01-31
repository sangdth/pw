import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import getPath from '../helpers/util/path';
// const devices = usb.getDeviceList();
// console.log('devices ', devices.length);
const pwFile = getPath('db.json');

const adapter = new FileSync(pwFile, {
  // run on write
  // serialize: (obj: any) => (obj),
  // run on read
  // deserialize: (str: string) => (str)
});

const db = low(adapter);

export const getPreferences = () => db.get('preferences').value();

export const setPreferences = (newPrefs: Preferences) => {
  db.get('preferences')
    // @ts-ignore
    .assign({
      ...getPreferences(),
      ...newPrefs,
    })
    .write();
  return getPreferences();
};

export const getItems = () => db.get('container').value();

export const addItem = (p: any) => {
  db.get('container')
    // @ts-ignore
    .push(p)
    .write();
  return getItems();
};

export const updateItem = (p: any) => {
  db.get('container')
    // @ts-ignore
    .find({ id: p.id })
    .assign({ ...p })
    .write();
  return getItems();
};

export const deleteItem = (id: string) => {
  db.get('posts')
    // @ts-ignore
    .remove({ id })
    .write();
  return getItems();
};

export default db;
