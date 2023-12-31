import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getCoins } from '../redux/coinlore/CoinSlice';

const ListCoins = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const coinLists = useSelector((store) => store.coinLi);
  useEffect(() => {
    dispatch(getCoins());
  }, [dispatch]);

  const [search, setSearch] = useState('');
  const [filteredCoins, setFilteredCoins] = useState([]);

  useEffect(() => {
    const filteredd = coinLists?.coinList?.data
      ?.filter((coin) => coin.symbol.toLowerCase().includes(search.toLowerCase()));
    setFilteredCoins(filteredd);
  }, [search, coinLists?.coinList?.data]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const navigate = useNavigate();
  const detailPage = (coins) => {
    navigate(`/details/${coins.name}`, { state: { coins } });
  };

  return (
    <>
      <form className="container my5" onSubmit={handleSubmit}>
        <div className="search-container">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            ref={inputRef}
            placeholder="Enter Currency Name"
            className="search-bar"
          />
        </div>
        <BsSearch className="search-icon" />
      </form>
      <div className="container grid my5">
        {coinLists.isLoading && <div>loading...</div>}
        {
          !coinLists?.isLoading && filteredCoins?.map((coin) => {
            // eslint-disable-next-line camelcase
            const { percent_change_24h } = coin;
            return (
              <button
                type="button"
                key={coin.id}
                className="card"
                onClick={() => detailPage(coin)}
              >
                <div className="statistic">
                  <h3>{coin.symbol}</h3>
                  <div className="face-up">
                    {
                      // eslint-disable-next-line camelcase
                      percent_change_24h < 0 ? (
                        <span>
                          <FaChevronDown color="red" />
                          {Math.abs(percent_change_24h).toFixed(2)}
                        </span>
                      ) : (
                        <span>
                          <FaChevronUp color="green" />
                          {Math.abs(percent_change_24h).toFixed(2)}
                        </span>
                      )
                    }
                  </div>
                </div>
              </button>
            );
          })
        }
      </div>
    </>
  );
};

export default ListCoins;
