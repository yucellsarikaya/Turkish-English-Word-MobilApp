import { Directory, Encoding, Filesystem } from "@capacitor/filesystem";
import { Capacitor } from "@capacitor/core";

export class FileOperations {
  public static platform: string = Capacitor.getPlatform();

  public static readFile = async (key: string) => {
    if (this.platform === "web") {
      let localStorageRead = await FileOperationsLocalStorage.readSecretFile(
        key
      );
      return localStorageRead;
    } else {
      let capacitorFileRead = await FileOperationsCapacitor.readSecretFile(key);
      return capacitorFileRead;
    }
  };

  public static writeFile = async (key: string, item: any[]) => {
    if (this.platform === "web") {
      await FileOperationsLocalStorage.writeSecretFile(key, item);
    } else {
      let capacitorFileRead = await FileOperationsCapacitor.writeSecretFile(
        key,
        item
      );
      return capacitorFileRead;
    }
  };
}

export class FileOperationsCapacitor {
  public static readSecretFile = async (key: string) => {
    try {
      const contents = await Filesystem.readFile({
        path: `${key}.txt`,
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
      });
      return contents.data;
    } catch (error) {
      return undefined;
    }
  };

  //Text dosyasına yazma işemi yapar
  public static writeSecretFile = async (key: string, item: any[]) => {
    try {
      await Filesystem.writeFile({
        path: `${key}.txt`,
        data: JSON.stringify(item),
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
        recursive: true,
      });
    } catch (error) {
      console.error(error);
    }
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
