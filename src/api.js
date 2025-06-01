const fetchProducts = async (skip = 0) => {
  const response = await fetch(`https://dummyjson.com/products?limit=10&skip=${skip}`);
  if (!response.ok) throw new Error("Network error");
  const data = await response.json();
  return data; 
};

export default fetchProducts;
