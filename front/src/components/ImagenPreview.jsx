import { Card, Input, Typography } from "@material-tailwind/react";
import React, { useState } from "react";

const ImagePreview = ({ imagen, setImagen }) => {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();

    reader.onloadend = () => {
      setImagen(reader.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <>
      <div className="w-full">
        <Typography
          variant="small"
          color="blue-gray"
          className="mb-2 text-left font-medium"
        >
          Imagen
        </Typography>
        <Input
          type="file"
          name="img"
          accept="image/.png, image/jpeg, image/jpg"
          className="placeholder:opacity-100 focus:!border-t-gray-900  "
          icon={<i className="fa-solid fa-image text-gray-500" />}
          onChange={handleImageChange}
        />
      </div>
      {imagen && (
        <>
          <div className="w-full">
            {" "}
            <Card
              shadow={false}
              className="flex flex-row w-full max-w-4xl h-64 overflow-hidden rounded-lg bg-white shadow-md"
            >
              <div
                className="w-1/2 h-full bg-cover bg-center transition-all duration-500 ease-in-out"
                style={{
                  backgroundImage: `url(${imagen})`,
                }}
              >
                <div className="h-full w-full bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
              </div>
              {/* Información adicional */}
            </Card>
          </div>
        </>
      )}
    </>
  );
};

export default ImagePreview;
