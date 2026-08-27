import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH2, EditableParagraph, InlineFormula } from "@/components/atoms";
import { VisualOptionCards } from "@/components/organisms";

export const whenThereIsNoInverseBlocks: ReactElement[] = [
    <StackLayout key="layout-singular-heading" maxWidth="xl">
        <Block id="singular-heading" padding="md">
            <EditableH2 id="h2-singular-heading" blockId="singular-heading">
                When There Is No Inverse
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-singular-idea" maxWidth="xl">
        <Block id="singular-idea" padding="sm">
            <EditableParagraph id="para-singular-idea" blockId="singular-idea">
                Take the matrix with rows <InlineFormula latex="(2, 4)" /> and{" "}
                <InlineFormula latex="(1, 2)" />. Its determinant is{" "}
                <InlineFormula latex="2 \times 2 - 4 \times 1 = 0" />, and the
                recipe now asks you to divide by zero. That is not a slip in the
                formula; it is a signal that this matrix cannot be undone at
                all.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-singular-visual" maxWidth="xl">
        <Block id="singular-visual" padding="sm">
            <VisualOptionCards
                blockId="singular-visual"
                intro="Pick how your students will see why a determinant of zero means no inverse exists."
                cards={[
                    {
                        id: "row-arrows",
                        title: "The two rows drawn as arrows that fall onto the same line",
                        looks: "Each row of the matrix shown as an arrow from the origin on a grid, with the determinant displayed beside them.",
                        manipulate: "Students drag the tip of either arrow and try to make the determinant reach zero.",
                        reveals: "The determinant is zero exactly when the two arrows lie along one line, so the matrix carries no second direction to undo.",
                        targetsMisconception: "Students still try to invert a matrix with determinant zero",
                        recommended: true,
                    },
                    {
                        id: "two-lines",
                        title: "A pair of simultaneous equations shown as two straight lines",
                        looks: "The matrix written as two equations, drawn as two lines on a grid, with their crossing point marked when it exists.",
                        manipulate: "Students change the coefficients and watch the lines cross, run parallel, or sit exactly on top of each other.",
                        reveals: "A zero determinant means the lines never cross at a single point, so there is no unique answer to recover.",
                    },
                    {
                        id: "rewind-test",
                        title: "A rewind button that tries to bring a squashed shape back",
                        looks: "A shape transformed by the matrix, with a rewind attempt shown beside it and a message when the rewind fails.",
                        manipulate: "Students pick different matrices and press rewind to see which ones can be undone.",
                        reveals: "Matrices with a determinant of zero flatten the shape, and nothing can rewind a flattened shape to what it was.",
                        targetsMisconception: "Students still try to invert a matrix with determinant zero",
                    },
                ]}
            />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-singular-summary" maxWidth="xl">
        <Block id="singular-summary" padding="sm">
            <EditableParagraph id="para-singular-summary" blockId="singular-summary">
                Find the determinant first. If it is zero the matrix is called
                singular and has no inverse, so there is nothing to calculate.
                If it is anything else, the swap, negate and divide recipe works
                every time.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
