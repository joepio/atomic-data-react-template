import { StoreContext } from "@tomic/react";
import { Agent, Store } from "@tomic/lib";
import Browser from "./Browser";

// We start by initializing an Atomic Data Store.
// The store contains all the data.
const store = new Store();

// By setting a Base URL, we tell the client where to send Commits to.
store.setBaseUrl("https://atomicdata.dev");

// Because we've got a BaseURL, we can open a websocket for two-way synchronization!
store.setWebSocket();

// Since we want to build a read & write app, we have to set an Agent.
// An Agent is a User with its own privateKey and subject (URL).
// You can create one on https://atomicdata.dev/invites/1
const privateKey = "vVlwcMiNx4IlcSudj4U/lGgRzMmLz55sOw7zW/auUwA=";
const agentURL =
  "https://atomicdata.dev/agents/MNMrcsojBwRiLEb5LAPAqKvr/u8nTMPD2APmA5Ew+wk=";
const demoAgent = new Agent(privateKey, agentURL);
store.setAgent(demoAgent);

// Here we make the store available in the console.
// Warning: Don't do this in production! It makes your life easier during development, though.
window.store = store;

export default function App() {
  return (
    // We must pass the store to this context provider to make the hooks work
    <StoreContext.Provider value={store}>
      {/* Here's the actual App! */}
      <Browser />
    </StoreContext.Provider>
  );
}
