import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH2, EditableParagraph } from "@/components/atoms";

export const wrappingUpBlocks: ReactElement[] = [
    <StackLayout key="layout-wrapping-heading" maxWidth="xl">
        <Block id="wrapping-heading" padding="md">
            <EditableH2 id="h2-wrapping-heading" blockId="wrapping-heading">
                Wrapping Up
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-wrapping-summary" maxWidth="xl">
        <Block id="wrapping-summary" padding="sm">
            <EditableParagraph id="para-wrapping-summary" blockId="wrapping-summary">
                You can now take two matrices, check their sizes, and build the
                answer one row against one column at a time, knowing that the
                order you multiply in changes what you get. For a two-by-two
                matrix you can find the determinant, and from it the inverse
                that undoes the matrix, or decide that no inverse exists.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-wrapping-next" maxWidth="xl">
        <Block id="wrapping-next" padding="sm">
            <EditableParagraph id="para-wrapping-next" blockId="wrapping-next">
                The determinant is the idea worth carrying away: one small
                subtraction that tells you whether a matrix can be undone. That
                single test is what lets a computer solve simultaneous equations
                in one step, and it is why the graphics in a game can rotate a
                scene and then rotate it straight back. Next you will use the
                inverse to solve systems of equations that would take far longer
                by hand.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
