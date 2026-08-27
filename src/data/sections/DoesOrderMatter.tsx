import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH2, EditableParagraph, InlineFormula } from "@/components/atoms";
import { VisualOptionCards } from "@/components/organisms";

export const doesOrderMatterBlocks: ReactElement[] = [
    <StackLayout key="layout-order-heading" maxWidth="xl">
        <Block id="order-heading" padding="md">
            <EditableH2 id="h2-order-heading" blockId="order-heading">
                Does Order Matter?
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-order-idea" maxWidth="xl">
        <Block id="order-idea" padding="sm">
            <EditableParagraph id="para-order-idea" blockId="order-idea">
                With ordinary numbers, <InlineFormula latex="7 \times 4" /> and{" "}
                <InlineFormula latex="4 \times 7" /> agree. Matrices are built
                from rows meeting columns, and swapping the two matrices swaps
                which rows meet which columns entirely. So does{" "}
                <InlineFormula latex="AB" /> still equal{" "}
                <InlineFormula latex="BA" />?
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-order-visual" maxWidth="xl">
        <Block id="order-visual" padding="sm">
            <VisualOptionCards
                blockId="order-visual"
                intro="Pick how your students will test whether the order of two matrices changes the answer."
                cards={[
                    {
                        id: "swap-compare",
                        title: "Two products computed side by side, with the order swapped by a button",
                        looks: "The same two matrices multiplied in both orders, the two answers displayed together, and the entries that differ marked.",
                        manipulate: "Students edit the entries of either matrix and swap the order to compare the two answers.",
                        reveals: "The two answers are usually different, so the order of multiplication genuinely matters.",
                        targetsMisconception: "Students assume AB gives the same result as BA",
                        recommended: true,
                    },
                    {
                        id: "shape-transform",
                        title: "A shape on a grid pushed through two matrices in each order",
                        looks: "A simple flag shape on a grid, shown after one matrix then the other, and again after the same two in the opposite order.",
                        manipulate: "Students swap the order of the two steps and compare the final shapes.",
                        reveals: "Doing the steps in a different order lands the shape somewhere else, which is why AB and BA differ.",
                        targetsMisconception: "Students assume AB gives the same result as BA",
                    },
                    {
                        id: "size-mismatch",
                        title: "A pair of rectangular matrices where only one order is even allowed",
                        looks: "A 2 x 3 and a 3 x 2 matrix with both orders attempted, showing the two answers at different sizes.",
                        manipulate: "Students change the sizes and check which orders are possible and what size each answer is.",
                        reveals: "Sometimes swapping the order changes the size of the answer, and sometimes it is not allowed at all.",
                    },
                ]}
            />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-order-summary" maxWidth="xl">
        <Block id="order-summary" padding="sm">
            <EditableParagraph id="para-order-summary" blockId="order-summary">
                For matrices, <InlineFormula latex="AB" /> and{" "}
                <InlineFormula latex="BA" /> are different calculations, and
                they usually give different answers. A few special pairs do
                agree, and one of them turns out to matter a great deal later
                in this lesson.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
