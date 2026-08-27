import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH2, EditableParagraph, InlineFormula } from "@/components/atoms";
import { VisualOptionCards } from "@/components/organisms";

export const rowMeetsColumnBlocks: ReactElement[] = [
    <StackLayout key="layout-row-column-heading" maxWidth="xl">
        <Block id="row-column-heading" padding="md">
            <EditableH2 id="h2-row-column-heading" blockId="row-column-heading">
                Row Meets Column
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-row-column-idea" maxWidth="xl">
        <Block id="row-column-idea" padding="sm">
            <EditableParagraph id="para-row-column-idea" blockId="row-column-idea">
                Monday's canteen sales are 20 rolls, 15 juices and 8 samosas.
                The prices are 30, 25 and 40 rupees. The takings are{" "}
                <InlineFormula latex="20 \times 30 + 15 \times 25 + 8 \times 40 = 1295" />.
                That single number is one entry of a matrix product: a row of
                one matrix meeting a column of the other, multiplied pair by
                pair and then added.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-row-column-visual" maxWidth="xl">
        <Block id="row-column-visual" padding="sm">
            <VisualOptionCards
                blockId="row-column-visual"
                intro="Pick how your students will see one entry of a matrix product being built."
                cards={[
                    {
                        id: "sliding-row",
                        title: "A row slides across a column, pairing numbers as it goes",
                        looks: "Two matrices side by side. One row of the first and one column of the second are highlighted, with the paired products listed underneath and their total shown as the answer entry.",
                        manipulate: "Students click any position in the answer matrix to see exactly which row and which column produce it.",
                        reveals: "Every entry of the answer comes from a whole row and a whole column, not from a single pair of numbers.",
                        targetsMisconception: "Students multiply matching positions together, like they do for addition",
                        recommended: true,
                    },
                    {
                        id: "canteen-till",
                        title: "The canteen till: sales table times price list, filled in step by step",
                        looks: "The sales table and the price list as matrices, with a running till receipt beside them showing each item's contribution and the day's total.",
                        manipulate: "Students change the number of rolls, juices or samosas sold and watch the takings recalculate.",
                        reveals: "Matrix multiplication is the arithmetic of combining quantities with prices, one row against one column.",
                    },
                    {
                        id: "wrong-way-compare",
                        title: "Side-by-side comparison of the correct rule and the position-by-position guess",
                        looks: "The same two matrices worked out twice: once by rows against columns, once by multiplying matching positions, with both answers displayed.",
                        manipulate: "Students switch between the two methods and check each against the canteen takings.",
                        reveals: "Only the row-against-column method gives the takings that actually make sense.",
                        targetsMisconception: "Students multiply matching positions together, like they do for addition",
                    },
                ]}
            />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-row-column-rule" maxWidth="xl">
        <Block id="row-column-rule" padding="sm">
            <EditableParagraph id="para-row-column-rule" blockId="row-column-rule">
                So the entry in row 1, column 2 of the answer always comes from
                row 1 of the first matrix and column 2 of the second. Adding
                matrices pairs up matching positions; multiplying them never
                does. Which row and column build the bottom-left entry?
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
