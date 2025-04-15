import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";

const ImagePreview = () => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setImagePreview(reader.result);
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
          name="imagen"
          accept="image/.png, image/jpeg, image/jpg"
          className="placeholder:opacity-100 focus:!border-t-gray-900"
          icon={<i className="fa-solid fa-image text-gray-500" />}
          onChange={handleImageChange}
        />
      </div>
      {imagePreview && (
        <Card
          shadow={false}
          className="flex flex-row w-full max-w-4xl h-64 overflow-hidden rounded-lg bg-white shadow-md"
        >
          <div
            className={`w-1/2 h-full bg-cover bg-center transition-all duration-500 ease-in-out ${
              imagePreview ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: imagePreview ? `url(${imagePreview})` : "none",
            }}
          >
            <div className="h-full w-full bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
          </div>

          <div className="w-1/2 p-6 flex flex-col justify-center text-left">
            <Typography variant="h4" className="mb-2 text-blue-gray-900">
              Nombre del medicamento
            </Typography>
            <Typography variant="small" className="text-blue-gray-500 mb-1">
              Concentración: 500 mg
            </Typography>
            <Typography variant="small" className="text-blue-gray-500 mb-1">
              Presentación: Tabletas
            </Typography>
            <Typography variant="small" className="text-blue-gray-500 mb-1">
              Vía: Oral
            </Typography>
            <Typography variant="small" className="text-blue-gray-500">
              Vencimiento: 2025-12-31
            </Typography>
          </div>
        </Card>
      )}
    </>
  );
};

export default ImagePreview;
