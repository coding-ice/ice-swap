export async function getServerSideProps() {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const cat = await res.json();

  return { props: { cat } };
}

function Cat({ cat }) {
  return <img src={cat[0].url} alt="cat" />;
}

export default Cat;
