import { TestBed, inject } from '@angular/core/testing';
import { } from 'jasmine';
import { TreeComponent } from './tree.component';
import { async } from '@angular/core/testing';

describe('tree.component test', () => {
    let component: TreeComponent;

    // register all needed dependencies
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                TreeComponent
            ]
        });
    });

     // instantiation through framework injection
    beforeEach(inject([TreeComponent], (TreeComponent) => {
        component = TreeComponent;
    }));
   

    it('should have an instance', () => {
        expect(component).toBeDefined();
    });
});