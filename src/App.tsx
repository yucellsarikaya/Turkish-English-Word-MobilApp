import React from "react";
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

export default function App() {
  const add = () => {
    localStorage.setItem("username", "John");
  };
  const show = () => {
    const username = localStorage.getItem("username");
    console.log(username); // "John"
  };

  const writeSecretFile = async () => {
    await Filesystem.writeFile({
      path: 'secrets/text.txt',
      data: "This is a test",
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
      
    });
  };

  return (
    <div>
      <div className="App">
        <button onClick={() => add()}>kayıt et</button>
        <button onClick={() => show()}>goster</button>
        <button onClick={() => writeSecretFile()}>yaz</button>
      </div>
    </div>
  );
}