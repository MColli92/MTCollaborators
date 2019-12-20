import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appNgDropFile]'
})
export class NgDropFileDirective {

  @Output() mouseOver: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  @HostListener('dragover', ['$event'])
  public onDragEnter( event: any ) {
    this.mouseOver.emit( true );
    this._preventStop( event );
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave( event: any ) {
    this.mouseOver.emit( false );
  }

  @HostListener('drop', ['$event'])
  public onDrop( event: any ) {
    const transfer = this._getTransfer( event );

    if ( !transfer ) {
      return;
    }
    this._getFile( transfer.files );
    this._preventStop( event );
    this.mouseOver.emit( false );
  }

  private _getTransfer( event: any ) {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private _getFile( fileList: FileList ) {
    // tslint:disable-next-line: forin
    for ( const propertie in Object.getOwnPropertyNames(fileList)) {
      const fileTemp = fileList[propertie];

      if ( this._isImage(fileTemp.type)) {
        return;
      }
    }
  }

  // Validaciones
  private _preventStop( event ) {
    event.preventDefault();
    event.stopPropagation();
  }

  private _isImage( typeFile: string) {
    return (typeFile === '' || typeFile === undefined) ? false : typeFile.startsWith('image');
  }
}
