const fs = require("node:fs/promises");
const path = require("node:path");
const contactsPath = path.join(__dirname, "/db/contacts.json");
const { nanoid } = require("nanoid");

async function listContacts() {
  const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const searchedContact = contacts.find((contact) => contact.id === contactId);
  return searchedContact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return undefined;
  }
  const deletedContact = contacts.splice(index, 1)[0];
  await fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
  return deletedContact;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
  return newContact;
}

module.exports = { listContacts, addContact, getContactById, removeContact };
