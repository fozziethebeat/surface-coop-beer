import Head from "../components/head";
import Nav from "../components/nav";

import { useState } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());
const SIZE = 20;

function HopSet({ prefix, index }) {
  const real_index = index * SIZE;
  const query = `/api/hops?prefix=${prefix}&size=${SIZE}&index=${real_index}`;
  const { data } = useSWR(query, fetcher);
  const hops = data || [];
  return hops.map((hop) => <div key={hop.Id}>{hop.Name}</div>);
}

export default function HopsPage() {
  const [state, setState] = useState({ prefix: "", index: 1 });

  const pages = [];
  for (let i = 0; i < state.index; ++i) {
    pages.push(<HopSet key={i} index={i} prefix={state.prefix} />);
  }
  return (
    <div>
      <Head title="Hops" />

      <Nav />

      <div className="w-full">
        <input
          type="name"
          onChange={(e) => setState({ ...state, prefix: e.target.value })}
          value={state.prefix}
          placeholder="Hop Name"
        ></input>
        {pages}
        <button onClick={() => setState({ ...state, index: state.index + 1 })}>
          Load More
        </button>
      </div>
    </div>
  );
}
