import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH2, EditableParagraph } from "@/components/atoms";
import { FormulaBlock } from "@/components/molecules";
import { VisualOptionCards } from "@/components/organisms";

export const theDeterminantBlocks: ReactElement[] = [
    <StackLayout key="layout-determinant-heading" maxWidth="xl">
        <Block id="determinant-heading" padding="md">
            <EditableH2 id="h2-determinant-heading" blockId="determinant-heading">
                The Determinant of a 2x2 Matrix
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-determinant-idea" maxWidth="xl">
        <Block id="determinant-idea" padding="sm">
            <EditableParagraph id="para-determinant-idea" blockId="determinant-idea">
                Every two-by-two matrix carries a single number that decides how
                it behaves. It is called the determinant, and for the matrix
                with entries a, b, c, d it is one subtraction.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-determinant-formula" maxWidth="xl">
        <Block id="determinant-formula" padding="lg">
            <FormulaBlock latex="\det\begin{pmatrix} a & b \\ c & d \end{pmatrix} = ad - bc" />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-determinant-visual" maxWidth="xl">
        <Block id="determinant-visual" padding="sm">
            <VisualOptionCards
                blockId="determinant-visual"
                intro="Pick how your students will see what the determinant of a 2x2 matrix measures."
                cards={[
                    {
                        id: "area-scaling",
                        title: "A unit square stretched by the matrix, with its new area displayed",
                        looks: "A one-by-one square on a grid and the tilted parallelogram the matrix turns it into, with the area shown next to the value of ad minus bc.",
                        manipulate: "Students drag the four entries and watch the parallelogram and its area change together.",
                        reveals: "The determinant is the factor by which areas are stretched, and it flattens to zero when the shape collapses to a line.",
                        recommended: true,
                    },
                    {
                        id: "diagonal-cross",
                        title: "The two diagonals highlighted as one product minus the other",
                        looks: "The four entries with the main diagonal joined in one colour and the other diagonal in another, each product shown and then subtracted.",
                        manipulate: "Students change any entry and watch both products and the difference update.",
                        reveals: "The determinant is always ad minus bc, and the order of the subtraction is what makes the sign meaningful.",
                    },
                    {
                        id: "zero-hunt",
                        title: "A hunt for matrices whose determinant lands on zero",
                        looks: "A 2x2 matrix with its determinant shown large, marked clearly when the value reaches zero.",
                        manipulate: "Students adjust the entries and try to make the determinant zero, then compare the matrices that manage it.",
                        reveals: "Determinant zero happens exactly when one row is a multiple of the other, and those matrices behave differently from the rest.",
                    },
                ]}
            />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-determinant-summary" maxWidth="xl">
        <Block id="determinant-summary" padding="sm">
            <EditableParagraph id="para-determinant-summary" blockId="determinant-summary">
                Multiply along the main diagonal, multiply along the other
                diagonal, then subtract in that order. Some matrices give a
                determinant of zero, and those turn out to be a special case
                worth watching.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
