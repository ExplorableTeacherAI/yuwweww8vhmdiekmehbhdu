import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH2, EditableH3, EditableParagraph, InlineFormula } from "@/components/atoms";
import { RowArrows } from "./visuals/RowArrows";
import { ChoiceQuestion, NumericQuestion } from "./practice/PracticeQuestions";

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
                inverse recipe now asks you to divide by zero. Drag the two
                arrows below and see what those matrices have in common.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-singular-visual" maxWidth="xl">
        <Block id="singular-visual" padding="sm" hasVisualization>
            <RowArrows />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-singular-summary" maxWidth="xl">
        <Block id="singular-summary" padding="sm">
            <EditableParagraph id="para-singular-summary" blockId="singular-summary">
                Line the arrows up and the determinant hits zero: the matrix
                offers only one direction, so the information needed to work
                backwards is gone. Such a matrix is called singular and has no
                inverse. Find the determinant first, and if it is zero there is
                nothing to calculate.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-singular-practice-heading" maxWidth="xl">
        <Block id="singular-practice-heading" padding="sm">
            <EditableH3 id="h3-singular-practice-heading" blockId="singular-practice-heading">
                Your turn
            </EditableH3>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-singular-practice-value-prompt" maxWidth="xl">
        <Block id="singular-practice-value-prompt" padding="sm">
            <EditableParagraph
                id="para-singular-practice-value-prompt"
                blockId="singular-practice-value-prompt"
            >
                A student is asked to invert the matrix with rows{" "}
                <InlineFormula latex="(3, -1.5)" /> and{" "}
                <InlineFormula latex="(2, -1)" />. What is its determinant?
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-singular-practice-value" maxWidth="xl">
        <Block id="singular-practice-value" padding="sm">
            <NumericQuestion
                answer={0}
                placeholder="Determinant"
                successFeedback="Correct, it is zero. The second row is exactly two thirds of the first, so this matrix is singular and the student should stop rather than divide."
                hints={[
                    "Work out both diagonal products carefully, keeping track of the negative signs.",
                    "The solid diagonal gives 3 x (-1) = -3, and the other gives (-1.5) x 2 = -3. Now subtract.",
                    "The answer is 0. Set the arrows above to (3, -1.5) and (2, -1) and see them fall onto one line.",
                ]}
            />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-singular-practice-choice-prompt" maxWidth="xl">
        <Block id="singular-practice-choice-prompt" padding="sm">
            <EditableParagraph
                id="para-singular-practice-choice-prompt"
                blockId="singular-practice-choice-prompt"
            >
                So what should that student do next?
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-singular-practice-choice" maxWidth="xl">
        <Block id="singular-practice-choice" padding="sm">
            <ChoiceQuestion
                options={[
                    {
                        id: "state-no-inverse",
                        label: "Stop and state that the matrix has no inverse",
                        correct: true,
                        feedback:
                            "Yes. A determinant of zero is a full answer in itself: the matrix is singular, so there is no inverse to find.",
                    },
                    {
                        id: "swap-and-negate-anyway",
                        label: "Swap and negate the entries anyway and leave the answer like that",
                        feedback:
                            "Those two steps always work, which is exactly why they are misleading here. Without the division by the determinant the result undoes nothing, and here the division is impossible.",
                    },
                    {
                        id: "divide-by-zero",
                        label: "Divide each entry by zero and write the entries as zero",
                        feedback:
                            "Dividing by zero has no answer, so nothing sensible comes out. Line the two arrows up above and read what happens to the shape between them.",
                    },
                    {
                        id: "use-reciprocals",
                        label: "Use one over each entry instead",
                        feedback:
                            "That is not what an inverse matrix means, and it would not undo the original matrix even when the determinant is not zero. Check the builder in the previous section.",
                    },
                ]}
            />
        </Block>
    </StackLayout>,
];
