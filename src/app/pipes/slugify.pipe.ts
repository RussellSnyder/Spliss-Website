import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'slugify', pure: false })
export class Slugify implements PipeTransform {
    transform(string: string) {
        return string.toLowerCase()
            .replace(/\s+/g, '-')           // Replace spaces with -
            .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
            .replace(/\-\-+/g, '-')         // Replace multiple - with single -
            .replace(/^-+/, '')             // Trim - from start of text
            .replace(/-+$/, '');            // Trim - from end of text
    }
}