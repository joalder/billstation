import {Pipe, PipeTransform} from '@angular/core';
import {Dude} from "./dude.service";

@Pipe({
  name: 'findDude'
})
export class FindDudePipe implements PipeTransform {

  transform(dudes: Dude[], url: URL): any {
    let dude: Dude;

    if (dudes !== undefined && dudes.length > 0) {
      dude = dudes.find(dude => dude.url === url);
    }

    return dude;
  }
}
