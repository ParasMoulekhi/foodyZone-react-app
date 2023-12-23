import styled from "styled-components";
import { useEffect, useState } from "react";
import SearchResult from "./components/SearchResults/SearchResult";

export const BASE_URL = "http://localhost:9000";

const App = () => {
  const [filteredData, setFilteredData] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedButton, setSelectedButton] = useState("all");

  useEffect(() => {
    const fetchFoodData = async () => {
      setLoading(true);
      try {
        const response = await fetch(BASE_URL);
        const json = await response.json();
        setData(json);
        setFilteredData(json);
        setLoading(false);
      } catch (error) {
        setError("Unable to fetch Data!!!");
      }
    };
    fetchFoodData();
  }, []);

  if (error) return <div>{error}</div>;
  if (loading) return <div>Loading...</div>;

  const searchFood = (e) => {
    const searchValue = e.target.value;
    console.log(searchValue);

    if (searchValue === "") {
      setFilteredData(null);
    }
    const filter = data?.filter((food) =>
      food.name.toLowerCase().includes(searchValue)
    );
    setFilteredData(filter);
  };

  const filterFood = (type) => {
    if (type === "all") {
      setFilteredData(data);
      setSelectedButton("all");
      return;
    }
    const filter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    setFilteredData(filter);
    setSelectedButton(type);
  };

  const filterBtns = [
    {
      name: "All",
      type: "all",
    },
    {
      name: "Breakfast",
      type: "breakfast",
    },
    {
      name: "Lunch",
      type: "lunch",
    },
    {
      name: "Dinner",
      type: "dinner",
    },
  ];

  return (
    <>
      <Container>
        <TopContainer>
          <div className="logo">
            <img src="/logo.svg" alt="logo" />
          </div>
          <div className="search">
            <input
              onChange={searchFood}
              type="text"
              placeholder="Search Food"
            />
          </div>
        </TopContainer>

        <FilterContainer>
          {filterBtns.map((value) => (
            <Button
              isSelected={selectedButton === value.type}
              onClick={() => filterFood(value.type)}
            >
              {value.name}
            </Button>
          ))}
        </FilterContainer>
      </Container>
      <SearchResult data={filteredData}></SearchResult>
    </>
  );
};
export default App;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
const TopContainer = styled.section`
  height: 140px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;

  .search {
    input {
      background-color: transparent;
      border: 1px solid red;
      color: white;
      border-radius: 5px;
      height: 40px;
      font-size: 16px;
      padding: 5px 10px;

      &::placeholder {
        color: white;
      }
    }
  }

  @media (0 < width < 600px) {
    flex-direction: column;
    height: 120px;
  }
`;

const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 30px;
`;

export const Button = styled.button`
  background-color: ${({ isSelected }) => (isSelected ? "#ff2222" : "#ff4343")};
  outline: 1px solid ${({ isSelected }) => (isSelected ? "white" : "#ff4343")};
  color: #ffffff;
  border-radius: 5px;
  padding: 6px 12px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #ff2222;
  }
`;
