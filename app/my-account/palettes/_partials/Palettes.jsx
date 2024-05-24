"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "./tables/DataTable";
import { columns } from "./tables/columns";
import getURL from "@/middleware/getUrl";

import Color, { Palette, usePalette } from "color-thief-react";

const Palettes = () => {
  const [palettes, setPalettes] = useState(null);
  const [img, setImg] = useState();
  const [preview, setPreview] = useState();

  const { data, loading, error } = usePalette(preview, 3, "hex");

  const onChangeImg = (e) => {
    setImg(e.target.files[0]);
  };

  useEffect(() => {
    const fetchPalettesData = async () => {
      const response = await fetch(getURL("/api/v1/admin/palettes"));
      const data = await response.json();

      setPalettes(data.palettes);
    };

    fetchPalettesData();

    if (!img) {
      return;
    }

    const objectUrl = URL?.createObjectURL(img);
    setPreview(objectUrl);
  }, [img]);

  return (
    <>
      {palettes && (
        <DataTable
          columns={columns}
          data={palettes}
        />
      )}

      <input
        type="file"
        onChange={onChangeImg}
      />

      {data?.map((item, index) => (
        <div key={index}>
          <p style={{ background: item }}>{item}</p>
        </div>
      ))}

      {/* <img
        src={preview}
        alt=""
        className="h-[200px] w-[200px]"
      /> */}

      {/* <Color
        src={imgSrc}
        crossOrigin="anonymous"
        format="hex"
      >
        {({ data, loading }) => {
          return (
            <div>
              Predominant color: <strong>{data}</strong>
            </div>
          );
        }}
      </Color>
      <Palette
        src={imgSrc}
        crossOrigin="anonymous"
        format="hex"
        colorCount={4}
      >
        {({ data, loading }) => {
          return (
            <div>
              Palette:
              <ul>
                {data?.map((color, index) => (
                  <li
                    key={index}
                    style={{ color: color }}
                  >
                    <strong>{color}</strong>
                  </li>
                ))}
              </ul>
            </div>
          );
        }}
      </Palette> */}
    </>
  );
};

export default Palettes;
