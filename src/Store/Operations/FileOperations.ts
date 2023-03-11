import { Directory, Encoding, Filesystem } from "@capacitor/filesystem";

export class FileOperationsCapacitor {
  public static readSecretFile = async () => {
    const contents = await Filesystem.readFile({
      path: "file.txt",
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });
    console.error("secrets:", contents);
    return contents.data;
  };

  //Text dosyasına yazma işemi yapar
  public static writeSecretFile = async () => {
    await Filesystem.writeFile({
      path: "file.txt",
      data: "Deneme Test 1",
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
      recursive: true,
    });
  };
}

export class FileOperationsLocalStorage {
  public static readSecretFile = async (key: string) => {
    const item = localStorage.getItem(key);
    return item;
  };

  //Text dosyasına yazma işemi yapar
  public static writeSecretFile = async (key: string, item: any[]) => {
    localStorage.setItem(key, JSON.stringify(item));
  };
}

