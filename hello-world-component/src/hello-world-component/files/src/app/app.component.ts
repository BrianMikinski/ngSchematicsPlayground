import {Component} from "@angular/core"

@Component({
    selector: "app-root",
    templateUrl: './app.component.html',
    stylesUrl: ['./app.component.css']
})
export class AppComponent{
    name = '<%= name %>'
}
