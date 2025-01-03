interface Params {
  params: {
    lng: string;
  };
}

export default function Home({ params: { lng } }: Params) {
  return (
    <div className="note-empty-state">
      <span className="note-text-empty-state"> {lng} =&gt; Click a note on the left to view something! 🥺</span>
    </div>
  );
}
