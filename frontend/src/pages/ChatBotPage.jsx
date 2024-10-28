import {Box,colors,IconButton,InputAdornment,TextField,Typography, useTheme} from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import logo from "../assets/chat-bot.png";
import logoChatLow from "../assets/chat-bot2.png";
import { useForm } from "react-hook-form";
import SendIcon from "@mui/icons-material/Send";
import { responder } from "../api/request";
import '../style/ChatBotStyleForm.css'

const heightNavbar = "65px";
const widthMenuBar = "320px";

function ChatBotPage() {
  const {register,handleSubmit,setValue,formState: { errors }} = useForm();
  const theme = useTheme();
  const [isTyping, setIsTyping] = useState(false);
  const [response, setResponse] = useState({ respuesta: "", pregunta: "" });
  const [minRows, setMinRows] = useState(5);
  const [isFixed, setIsFixed] = useState(false);
  const [paddingValue, setPaddingValue] = useState("2rem");
  const [borderRadiusValue, setBorderRadiusValue] = useState("2rem");
  const boxRef = useRef(null);
  const [boxWidth, setBoxWidth] = useState(0);

  const onSubmit = async (data) => {
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
  const updateBoxWidth = ()=> {
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
            background: theme.palette.mode==='dark' ? '#343a40' : '#F9F9FE',
            boxShadow: theme.palette.mode==='dark' ? 
            '10px 10px 20px #212529, -10px -10px 30px #6c757d' :
            '20px 20px 80px #bebebe, -20px -20px 80px #bebebe',
            padding: "2rem",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Typography variant="h6" component="span" fontWeight="bold">
              Pregunta:
            </Typography>
            <Typography variant="body1" component="span">
              {` ${response.pregunta.toUpperCase()}`}
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
              {` ${response.respuesta}`}
            </Typography>
          </Box>
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
          background: theme.palette.mode==='dark' ? '#343a40' : '#F9F9FE',
          boxShadow: theme.palette.mode==='dark' ? 
            '10px 10px 20px #212529, -10px -10px 30px #6c757d' :
            '20px 20px 80px #bebebe, -20px -20px 80px #bebebe',
          mb: "2rem",
          gap: "0.5rem",
        }}
      >
        <Box pb={"0.1rem"}>
          <img
            src={response.pregunta=="" ? logo : logoChatLow}
            height={response.pregunta === "" ? "150px" : "60px"}
            alt="bot IA"
          />
        </Box>

        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <Box>
            <TextField
              id="text-area"
              {...register("texto", { required: "El campo es requerido" })}
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
              error={!!errors.texto}
              helperText={errors.texto ? errors.texto.message : ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      type="submit"
                      sx={{ color: "primary.main", padding: 0 }}
                    >
                      <SendIcon />
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
