import { Box, IconButton, InputAdornment, TextField, Tooltip } from "@mui/material";
import React, { useCallback, useState } from "react";
import logo from "../assets/chat-bot.png";
import logoChatLow from "../assets/chat-bot2.png";
import { useForm } from "react-hook-form";
import SendIcon from "@mui/icons-material/Send";
import { responder } from "../api/request";
import "../style/ChatBotStyleForm.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const FormularioChatBot = ({ response, setResponse, boxWidth, theme}) => {

  const { register, handleSubmit, setValue } = useForm();
  const [isTyping, setIsTyping] = useState(false);
  const [minRows, setMinRows] = useState(5);
  const [isFixed, setIsFixed] = useState(false);
  const [paddingValue, setPaddingValue] = useState("2rem");
  const [borderRadiusValue, setBorderRadiusValue] = useState("2rem");

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

  //Funcion que se ejecuta al presionar +
  const pressMore = () => {
    console.log("Adjuntar archivo.");
  };

  return (
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
  );
};

export default FormularioChatBot;
