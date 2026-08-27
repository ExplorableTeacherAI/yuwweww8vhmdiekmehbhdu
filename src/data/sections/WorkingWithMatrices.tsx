import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH1, EditableParagraph } from "@/components/atoms";

export const workingWithMatricesBlocks: ReactElement[] = [
    <StackLayout key="layout-matrices-title" maxWidth="xl">
        <Block id="matrices-title" padding="md">
            <EditableH1 id="h1-matrices-title" blockId="matrices-title">
                Working with Matrices
            </EditableH1>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-matrices-opening" maxWidth="xl">
        <Block id="matrices-opening" padding="sm">
            <EditableParagraph id="para-matrices-opening" blockId="matrices-opening">
                The school canteen keeps two tables. One counts how many rolls,
                juices and samosas were sold on Monday and on Tuesday. The other
                lists the price of each item. Neither table alone tells the
                manager the takings for the day, yet the two together clearly do.
                Matrix multiplication is the rule that combines them, and it is
                nothing like adding matrices, where you simply pair up matching
                positions.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-matrices-promise" maxWidth="xl">
        <Block id="matrices-promise" padding="sm">
            <EditableParagraph id="para-matrices-promise" blockId="matrices-promise">
                By the end you will multiply two matrices, say which pairs can be
                multiplied at all, and then go one step further: find the
                determinant of a two-by-two matrix and use it to undo the matrix
                with an inverse. You already read a matrix as rows and columns,
                add and subtract matrices of the same size, and handle negative
                numbers. That is everything you need to start.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
