import React,{useState} from "react";
import {  Center, Flex } from "@chakra-ui/react";
import ReactDOM from "react-dom";

import { RegistrationPage } from "signup/Container";
import { List } from "list/Container";
import { Details } from "details/Container";

import "./index.css";

const App = () => {
  const [currentPage, setCurrentPage] = useState({
    id: null,
    payload: null,
  });

  function handleNaviation(e) {
    const { navId } = e.currentTarget.dataset;
    setCurrentPage({ id: navId, payload: null });
  }

  function handleEmployeeSelection(employee) {
    setCurrentPage({ id: "details", payload: employee });
  }

  function handleDefaultNavigation() {
    setCurrentPage({ id: "registration", payload: null });
  }

  function resetPage() {
    if(currentPage.id === "details")
    {setCurrentPage({
      id: "list",
      payload: null,
    })} else {
      setCurrentPage({
      id: null,
      payload: null,
    })}
  }

  return (
		<Center
			height="100vh"
			width="100%"
			backgroundColor="black"
			margin="0"
			p="0"
			flexDirection="column"
		>
      			<Flex
				border="1px solid #151421"
				borderRadius="1rem"
				height="50vh"
        width="50%"
				justifyContent="space-around"
				alignItems="center"
				flexDirection="column"
				backgroundColor="beige"
			>
      <header>
        <h2>Employee Portal</h2>
        {currentPage.id === null &&
        <nav style={{display:"flex", justifyContent:"space-around"}}>
          <ul >
            <li>
              <button 
                disabled={currentPage.id === "list"}
                data-nav-id="list"
                onClick={handleNaviation}
              >
                 Employee List
              </button>
            </li>
            <li>
              <button
                disabled={currentPage.id === "registration"}
                data-nav-id="registration"
                onClick={handleNaviation}
              >
                Register
              </button>
            </li>
          </ul>
        </nav>}  
      {currentPage.id === "details" &&<Details data={currentPage.payload ? currentPage.payload : {}} />
    }
      </header>
      {currentPage.id === "registration" && <RegistrationPage />}
      {currentPage.id === "list" && (
        <List
          onEmptyList={handleDefaultNavigation}
          onItemSelect={handleEmployeeSelection}
        />
      )}
      {/* {currentPage.payload && (
        <Details data={currentPage.payload ? currentPage.payload : {}} />
      )} */}
      </Flex>
      <button onClick={resetPage}>Go back</button>
    </Center>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
