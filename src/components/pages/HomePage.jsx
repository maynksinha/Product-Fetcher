import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import Cards from '../Cards';
import Loader from '../Loader';
import fetchProducts from '../../api';

const HomePage = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [priceFilter, setPriceFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const skip = page * 10;
      setLoading(true);
      try {
        const result = await fetchProducts(skip);
        if (result && result.products?.length > 0) {
          setData(prev => [...prev, ...result.products]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      const bottomReached =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

      if (bottomReached && !loading) {
        setPage(prev => prev + 1);
      }
    };
    if (window == undefined) return
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

   let temp = [...data];

  const search = ()=>{
      if (searchQuery) {
      temp = temp.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  }

  const filter = ()=>{
    
    if (priceFilter === 'lowToHigh') {
      temp.sort((a, b) => a.price - b.price);
    } else if (priceFilter === 'highToLow') {
      temp.sort((a, b) => b.price - a.price);
    }

    if (ratingFilter === 'highToLow') {
      temp.sort((a, b) => b.rating - a.rating);
    } else if (ratingFilter === 'lowToHigh') {
      temp.sort((a, b) => a.rating - b.rating);
    }
  }

  useEffect(() => {
    search()
    setFilteredData(temp);
  }, [searchQuery, data]);

  useEffect(() => {
    filter()
    setFilteredData(temp);
  }, [priceFilter, ratingFilter, searchQuery, data]);

  // console.log({ filteredData })

  return (
    <>
      <Navbar
        setPriceFilter={setPriceFilter}
        setRatingFilter={setRatingFilter}
        setSearchQuery={setSearchQuery}
      />
      <div className="cards-container">
        {filteredData.length > 0 ? (
          filteredData.map((product) => (
            <Cards
              key={product.id}
              id={product.id}
              title={product.title}
              images={product.images}
              price={product.price}
              brand={product.brand}
              rating={product.rating}
              category={product.category}
            />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
      {loading && <Loader />}
    </>
  );
};

export default HomePage;