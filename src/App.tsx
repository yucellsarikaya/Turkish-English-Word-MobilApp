import { Directory, Encoding, Filesystem, ReadFileResult } from '@capacitor/filesystem';
import React, { useState } from 'react';
import { FileOperations } from './Store/FileOperations';
export default function App() {
  const [textread, setText] = React.useState<string>("boş");

  const add = () => {
    localStorage.setItem("username", "John");
  };
  const show = () => {
    const username = localStorage.getItem("username");
    console.log(username); // "John"
  };

  //Text dosyasına yazma işemi yapar
  const writeSecretFile = async () => {
   await Filesystem.writeFile({
      path: 'text2.txt',
      data: "Deneme Test",
      directory: Directory.Documents,
      encoding:Encoding.UTF8,
      recursive: true
    });
  };

  //Text dosyasına okuma işemi yapar
  const readSecretFile = async () => {
    const contents = await Filesystem.readFile({
      path: 'text2.txt',
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });
    console.error('secrets:', contents);
  };

  const test = async () => {
    const t = await FileOperations.readSecretFile()
    setText(t)
  }

  return (
    <div>
      <div className="App">
        <a>Web için kullanılacak kısım</a>
        <button onClick={() => add()}>kayıt et</button>
        <button onClick={() => show()}>goster</button>
        
        <a>Mobil için kullanılacak kısım</a>
        <button onClick={() => FileOperations.writeSecretFile()}>yaza32</button>
        <button onClick={() => test()}>oku</button>
        <a>{textread.toString()}</a>
      </div>
    </div>
  );
}