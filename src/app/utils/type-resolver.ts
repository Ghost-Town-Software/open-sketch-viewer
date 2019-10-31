import {EMPTY, from} from "rxjs";
import {map} from "rxjs/operators";
import {FileType} from "../enums/file.type";

export class TypeResolver {
  private static readonly extensionMap = {
    'jpg': FileType.IMAGE,
    'jpeg': FileType.IMAGE,
    'png': FileType.IMAGE,
    'gif': FileType.IMAGE,
    'json': FileType.JSON,
  };

  public static resolveType(filename) {
    const extension = filename.split('.').pop();

    if(extension in TypeResolver.extensionMap) {
      return TypeResolver.extensionMap[extension];
    }

    return FileType.UNKNOWN;
  }
}
