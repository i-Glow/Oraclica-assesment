import { useState } from "react";
import { getFacts } from "../../api/client";

type TFact = {
  fact: string;
  saved: boolean;
  index: number;
};

export const Challenge1 = () => {
  const [facts, setFacts] = useState<TFact[]>([]);
  const [noFacts, setNoFacts] = useState(5);

  async function getNewFacts() {
    try {
      const fetchedFacts = await getFacts(noFacts);
      const newFacts = fetchedFacts.map((fact, index) => ({
        index: index + 1,
        fact,
        saved: false,
      }));

      setFacts(newFacts);
    } catch (error) {
      console.error(error);
    }
  }

  function removeUnsavedFacts() {
    const savedFacts = facts.filter((fact) => fact.saved);
    setFacts(savedFacts);
  }

  function emptyFactsTable() {
    setFacts([]);
  }

  function saveFact(index: number) {
    const fact = facts.find((fact) => fact.index === index);
    if (fact) fact.saved = !fact?.saved;
    setFacts([...facts]);
  }

  function sortFacts(option: "ALPHA" | "INDEX" | "SHUFFLE") {
    let sortedFacts = facts;

    switch (option) {
      case "ALPHA":
        sortedFacts = facts.sort((a, b) => a.fact.localeCompare(b.fact));
        break;
      case "INDEX":
        sortedFacts = facts.sort((a, b) => a.index - b.index);
        break;
      case "SHUFFLE":
        for (let i = 0; i < facts.length; i++) {
          const rand = Math.floor(Math.random() * facts.length);

          const temp = facts[i];
          facts[i] = facts[rand];
          facts[rand] = temp;
        }
        break;
    }

    setFacts([...sortedFacts]);
  }

  return (
    <>
      <header>
        <h3>Challenge 1: Populating your UI with Fetched Data</h3>
      </header>
      <p>
        <strong>
          Check <code>src/challenges/1/instructions.txt</code> for instructions.
        </strong>
        <br />
        Code is located in <code>src/challenges/1/index.tsx</code>.
      </p>
      <input
        placeholder="number of facts"
        type="number"
        onChange={(e) => setNoFacts(e.target.valueAsNumber)}
      />{" "}
      | <button onClick={getNewFacts}>Reset table and get new facts</button>{" "}
      <hr />
      <button onClick={removeUnsavedFacts}>
        Remove all unsaved facts from table
      </button>{" "}
      | <button onClick={emptyFactsTable}>Empty table</button>
      <hr />
      <button onClick={() => sortFacts("ALPHA")}>
        Sort alphabetically (a to z)
      </button>{" "}
      |{" "}
      <button onClick={() => sortFacts("INDEX")}>
        sort by index ascending
      </button>{" "}
      | <button onClick={() => sortFacts("SHUFFLE")}>Shuffle rows</button>
      <hr />
      <table>
        <thead>
          <tr>
            <th>Index</th>
            <th>Fact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {facts?.map((fact) => (
            <tr key={fact.index}>
              <td>{fact.index}</td>
              <td>{fact.fact}</td>
              <td>
                <button onClick={() => saveFact(fact.index)}>
                  {fact.saved ? "Un-Save" : "Save"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
