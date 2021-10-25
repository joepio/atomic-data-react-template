import { useCurrentAgent } from "@tomic/react";
import { classes, properties } from "@tomic/lib";
import { useState } from "react";
import { MyResource } from "./MyResource";

export default function Browser() {
  const demoResourceURL = "https://atomicdata.dev/paragraph/wpnc073smz";
  const [subject, setSubject] = useState(demoResourceURL);
  const [agent] = useCurrentAgent();

  return (
    <>
      <h1>Atomic Data React Template</h1>
      <p>
        This demo application is created to demonstrate how the `@tomic/lib` and
        `@tomic/react` APIs can be used.
      </p>
      {/* <p>Current Agent (User): {agent?.subject}</p> */}
      <button onClick={() => setSubject(demoResourceURL)}>Demo Resource</button>
      <button onClick={() => setSubject(classes.agent)}>Agent (Class)</button>
      <button onClick={() => setSubject(properties.description)}>
        Description (Property)
      </button>
      <button
        onClick={() =>
          setSubject(
            "https://atomicdata.dev/agents/QmfpRIBn2JYEatT0MjSkMNoBJzstz19orwnT5oT2rcQ="
          )
        }
      >
        Joep (Agent)
      </button>
      <br />
      <input
        style={{ width: "100%" }}
        onChange={(e) => setSubject(e.target.value)}
        value={subject}
      />
      {/* By passing an Atomic Data URL (subject) here, we can Render that resource! */}
      <MyResource subject={subject} key={subject} />
    </>
  );
}
