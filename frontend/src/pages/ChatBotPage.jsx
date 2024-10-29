import {Box,Typography,useTheme} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import FormularioChatBot from "../components/FormularioChatBot";

const heightNavbar = "65px";

function ChatBotPage() {
  
  const theme = useTheme();
  const [response, setResponse] = useState({ respuesta: "", pregunta: "" });
  const boxRef = useRef(null);
  const [boxWidth, setBoxWidth] = useState(0);
  const [listResponse, setListaResponse] = useState([]);
  const lastQuestionRef = useRef(null);

  useEffect(() => {
    if (lastQuestionRef.current) {
      lastQuestionRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [listResponse]); // Dependencia para ejecutar cada vez que cambia el arreglo

  // Función para actualizar el ancho del box
  const updateBoxWidth = () => {
    if (boxRef.current.offsetWidth != null) {
      setBoxWidth(boxRef.current.offsetWidth);
    }
  };

  useEffect(() => {
    const resizeObserver = new ResizeObserver(updateBoxWidth);
    if (boxRef.current) {
      resizeObserver.observe(boxRef.current);
    }
    // Inicializa el ancho al montar el componente
    updateBoxWidth();
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (response.pregunta != "") {
      setListaResponse([...listResponse, response]);
    }
  }, [response]);

  return (
    <Box
      ref={boxRef}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflowX: "hidden", // Evitar scroll horizontal
        width: "100%",
        height:
          response.pregunta == ""
            ? `calc(100vh - ${heightNavbar} - 32px)`
            : "100%",
      }}
    >
      {response.respuesta && (
        <Box
          sx={{
            mb: "150px",
            width: "80%", // Limitar el ancho para evitar scroll
            borderRadius: "1rem",
            background: theme.palette.mode === "dark" ? "#343a40" : "#F9F9FE",
            boxShadow:
              theme.palette.mode === "dark"
                ? "10px 10px 20px #212529, -5px -5px 10px #6c757d"
                : "10px 10px 20px #E9ECEF, -5px -5px 10px #bebebe",
            padding: "2rem",
          }}
        >
          {listResponse.map((resp, index) => (
            <div key={index}>
              {listResponse.length > 1 && index >= 1 && (
                <Box ref={lastQuestionRef} sx={{ p: "2rem" }}></Box>
              )}

              <Box sx={{ width: "100%" }}>
                <Typography variant="h6" component="span" fontWeight="bold">
                  Pregunta:
                </Typography>
                <Typography variant="body1" component="span">
                  {` ${resp.pregunta.toUpperCase()}`}
                </Typography>
              </Box>
              <Box sx={{ width: "100%" }}>
                <Typography variant="h6" component="span" fontWeight="bold">
                  Respuesta:
                </Typography>
                <Typography
                  variant="body1"
                  component="span"
                  sx={{ textAlign: "justify", display: "block" }}
                >
                  {` ${resp.respuesta}`}
                </Typography>
              </Box>
            </div>
          ))}
        </Box>
      )}

      <FormularioChatBot response={response} setResponse={setResponse} boxWidth={boxWidth}
        theme={theme}  
      />
    </Box>
  );
}

export default ChatBotPage;
