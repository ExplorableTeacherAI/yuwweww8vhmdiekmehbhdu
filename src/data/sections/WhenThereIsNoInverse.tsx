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
                        id: "collapse-to-line",
                        title: "A square that collapses onto a single line as the determinant reaches zero",
                        looks: "A grid square stretched by the matrix, flattening into a line the moment the determinant hits zero, with the determinant value shown alongside.",
                        manipulate: "Students drag the entries towards a determinant of zero and watch the shape flatten.",
                        reveals: "Once everything is squashed onto one line, the original positions are lost, so no matrix can bring them back.",
                        targetsMisconception: "Students still try to invert a matrix with determinant zero",
                        recommended: true,
                    },
                    {
                        id: "many-to-one",
                        title: "Different starting points that all land on the same place",
                        looks: "Several marked points on a grid and where the matrix sends them, with separate points arriving at an identical destination.",
                        manipulate: "Students move a point and watch its destination, then find another point that lands on exactly the same spot.",
                        reveals: "If two different inputs give the same output, there is no way to work backwards, so no inverse exists.",
                        targetsMisconception: "Students still try to invert a matrix with determinant zero",
                    },
                    {
                        id: "recipe-breakdown",
                        title: "The inverse recipe run on a zero-determinant matrix until it breaks",
                        looks: "The swap and negate steps completed successfully, then the division step showing the determinant as zero and the calculation stopping.",
                        manipulate: "Students switch between a matrix that works and one that does not, and compare where the recipe fails.",
                        reveals: "The first two steps always succeed, so the determinant check must come before you trust the answer.",
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
