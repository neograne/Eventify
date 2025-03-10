import React from "react";

const Main = () => {
  return (
    <div style={styles.container}>
      <h1>Добро пожаловать в лучшее веб-приложение эвэр</h1> 
      <h2>Добро пожаловать в лучшее веб-приложение эвэр</h2> 
      <h3>Добро пожаловать в лучшее веб-приложение эвэр</h3> 
      <h4>Добро пожаловать в лучшее веб-приложение эвэр</h4> 
      <h5>Добро пожаловать в лучшее веб-приложение эвэр</h5> 
      <h6>Добро пожаловать в лучшее веб-приложение эвэр</h6> 
    </div>
  );
};

const styles = {
    container: {
        maxWidth: "850px",
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
      },
  };
  
export default Main;