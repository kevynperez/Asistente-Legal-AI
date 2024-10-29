import {
  Box,
  colors,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import logo from "../assets/chat-bot.png";
import logoChatLow from "../assets/chat-bot2.png";
import { useForm } from "react-hook-form";
import SendIcon from "@mui/icons-material/Send";
import { responder } from "../api/request";
import "../style/ChatBotStyleForm.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AttachFileIcon from "@mui/icons-material/AttachFile";

const heightNavbar = "65px";
const widthMenuBar = "320px";

function ChatBotPage() {
  const { register, handleSubmit, setValue } = useForm();
  const theme = useTheme();
  const [isTyping, setIsTyping] = useState(false);
  const [response, setResponse] = useState({ respuesta: "", pregunta: "" });
  const [minRows, setMinRows] = useState(5);
  const [isFixed, setIsFixed] = useState(false);
  const [paddingValue, setPaddingValue] = useState("2rem");
  const [borderRadiusValue, setBorderRadiusValue] = useState("2rem");
  const boxRef = useRef(null);
  const [boxWidth, setBoxWidth] = useState(0);
  const [listResponse, setListaResponse] = useState([]);
  const lastQuestionRef = useRef(null);

  useEffect(() => {
    if (lastQuestionRef.current) {
      lastQuestionRef.current.scrollIntoView({
        behavior: "smooth",
        bloock: "nearest",
      });
    }
  }, [listResponse]); // Dependencia para ejecutar cada vez que cambia el arreglo

  const onSubmit = async (data) => {
    if (data.texto != "") {
      setIsTyping(true);
      const datos = await responder(data.texto);
      setResponse({
        respuesta: datos.data.respuesta,
        pregunta: datos.data.pregunta,
      });
      setValue("texto", "");
      setMinRows(1);
      setIsFixed(true);
      setIsTyping(false);
      setPaddingValue("0.5rem");
      setBorderRadiusValue("3rem");
    }
  };

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleSubmit(onSubmit)();
      }
    },
    [handleSubmit]
  );

  // Función para actualizar el ancho del box
  const updateBoxWidth = () => {
    if (boxRef.current.offsetWidth != null) {
      setBoxWidth(boxRef.current.offsetWidth);
    }
  };

  //Funcion que se ejecuta al presionar +
  const pressMore = () => {
    console.log("Adjuntar archivo.");
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

      <Box
        width={boxWidth * 0.8}
        sx={{
          display: "flex",
          alignItems: "center",
          position: isFixed ? "fixed" : "sticky",
          bottom: isFixed ? "0" : "center",
          padding: paddingValue,
          borderRadius: borderRadiusValue,
          background: theme.palette.mode === "dark" ? "#343a40" : "#F9F9FE",
          boxShadow:
            theme.palette.mode === "dark"
              ? "10px 10px 20px #212529, -5px -5px 10px #6c757d"
              : "10px 10px 20px #E9ECEF, -5px -5px 10px #bebebe",
          mb: "2rem",
          gap: "0.5rem",
        }}
      >
        <Box>
          <img
            src={response.pregunta == "" ? logo : logoChatLow}
            height={response.pregunta === "" ? "150px" : "50px"}
            alt="bot IA"
          />
        </Box>

        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <TextField
              id="text-area"
              {...register("texto")}
              autoComplete="off"
              label={
                isTyping ? (
                  <span>
                    Escribiendo <span className="dots"></span>
                  </span>
                ) : (
                  "Pregunte algo"
                )
              }
              placeholder="Qué hay de nuevo ..."
              multiline
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: response.pregunta == "" ? "1rem" : "0.5rem", // Ajusta el padding aquí
                  textAlign: "center",
                },
                width: "100%",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderRadius: borderRadiusValue, // Cambia el valor según lo que necesites
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderRadius: borderRadiusValue, // Asegúrate de que se mantenga en hover
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderRadius: borderRadiusValue, // Asegúrate de que se manten
                },
              }} // Ajustar a todo el ancho disponible
              minRows={minRows}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <Tooltip title="adjuntar archivo" placement="top" arrow>
                      <IconButton onClick={pressMore}>
                        <AddCircleOutlineIcon
                          sx={{
                            color: "primary.main",
                            height: response.pregunta == "" ? "35px" : "25px",
                            width: response.pregunta == "" ? "35px" : "25px",
                          }}
                        />
                      </IconButton>
                    </Tooltip>

                    <IconButton type="submit" size="small">
                      <SendIcon
                        sx={{
                          color: "primary.main",
                          height: response.pregunta == "" ? "35px" : "25px",
                          width: response.pregunta == "" ? "35px" : "25px",
                        }}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={(e) => {
                const value = e.target.value;
                setValue("texto", value);
                setIsTyping(!!value);
              }}
              onKeyDown={handleKeyDown}
            />
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default ChatBotPage;
