import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH2, EditableH3, EditableParagraph, InlineFormula } from "@/components/atoms";
import { FormulaBlock } from "@/components/molecules";
import { InverseBuilder } from "./visuals/InverseBuilder";
import { ChoiceQuestion, NumericQuestion } from "./practice/PracticeQuestions";

export const buildingTheInverseBlocks: ReactElement[] = [
    <StackLayout key="layout-inverse-heading" maxWidth="xl">
        <Block id="inverse-heading" padding="md">
            <EditableH2 id="h2-inverse-heading" blockId="inverse-heading">
                Building the Inverse
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-inverse-idea" maxWidth="xl">
        <Block id="inverse-idea" padding="sm">
            <EditableParagraph id="para-inverse-idea" blockId="inverse-idea">
                The inverse of a matrix is the matrix that undoes it, so that{" "}
                <InlineFormula latex="A A^{-1}" /> leaves everything unchanged.
                It is not one over each entry. Building it takes three moves:
                swap the two entries on the main diagonal, negate the other two,
                then divide everything by the determinant.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-inverse-formula" maxWidth="xl">
        <Block id="inverse-formula" padding="lg">
            <FormulaBlock latex="\begin{pmatrix} a & b \\ c & d \end{pmatrix}^{-1} = \frac{1}{ad - bc}\begin{pmatrix} d & -b \\ -c & a \end{pmatrix}" />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-inverse-visual" maxWidth="xl">
        <Block id="inverse-visual" padding="sm" hasVisualization>
            <InverseBuilder />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-inverse-summary" maxWidth="xl">
        <Block id="inverse-summary" padding="sm">
            <EditableParagraph id="para-inverse-summary" blockId="inverse-summary">
                Step through swap, negate and divide and watch which entries
                move and which change sign. The divide step is part of the
                answer, not an extra: stopping at step 2 leaves a matrix that
                does not undo anything. Notice too what that step would ask of a
                matrix whose determinant is zero.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-inverse-practice-heading" maxWidth="xl">
        <Block id="inverse-practice-heading" padding="sm">
            <EditableH3 id="h3-inverse-practice-heading" blockId="inverse-practice-heading">
                Your turn
            </EditableH3>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-inverse-practice-choice-prompt" maxWidth="xl">
        <Block id="inverse-practice-choice-prompt" padding="sm">
            <EditableParagraph
                id="para-inverse-practice-choice-prompt"
                blockId="inverse-practice-choice-prompt"
            >
                Which of these is the inverse of the matrix with top row{" "}
                <InlineFormula latex="(3, 5)" /> and bottom row{" "}
                <InlineFormula latex="(1, 4)" />?
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-inverse-practice-choice" maxWidth="xl">
        <Block id="inverse-practice-choice" padding="sm">
            <ChoiceQuestion
                options={[
                    {
                        id: "correct-inverse",
                        label: (
                            <InlineFormula latex="\frac{1}{7}\begin{pmatrix} 4 & -5 \\ -1 & 3 \end{pmatrix}" />
                        ),
                        correct: true,
                        feedback:
                            "Correct. The 3 and 4 swapped, the 5 and 1 changed sign, and every entry was divided by the determinant 7.",
                    },
                    {
                        id: "no-division",
                        label: <InlineFormula latex="\begin{pmatrix} 4 & -5 \\ -1 & 3 \end{pmatrix}" />,
                        feedback:
                            "The swap and the signs are right, but this is the working copy at step 2. Press step 3 in the builder above and see what the divide step still has to do.",
                    },
                    {
                        id: "no-swap",
                        label: (
                            <InlineFormula latex="\frac{1}{7}\begin{pmatrix} 3 & -5 \\ -1 & 4 \end{pmatrix}" />
                        ),
                        feedback:
                            "The signs and the division are right, but check which entries move. Press step 1 above and watch which two swap places.",
                    },
                    {
                        id: "reciprocals",
                        label: (
                            <InlineFormula latex="\begin{pmatrix} \frac{1}{3} & \frac{1}{5} \\ \frac{1}{1} & \frac{1}{4} \end{pmatrix}" />
                        ),
                        feedback:
                            "That is one over each entry, which is not what an inverse matrix means. Set the builder above to 3, 5, 1, 4 and step through swap, negate and divide instead.",
                    },
                ]}
            />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-inverse-practice-entry-prompt" maxWidth="xl">
        <Block id="inverse-practice-entry-prompt" padding="sm">
            <EditableParagraph
                id="para-inverse-practice-entry-prompt"
                blockId="inverse-practice-entry-prompt"
            >
                A matrix has top row <InlineFormula latex="(6, 2)" /> and bottom
                row <InlineFormula latex="(4, 3)" />. What is the top-left entry
                of its inverse, as a decimal?
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-inverse-practice-entry" maxWidth="xl">
        <Block id="inverse-practice-entry" padding="sm">
            <NumericQuestion
                answer={0.3}
                tolerance={0.005}
                placeholder="Top-left entry"
                successFeedback="Correct. The 3 moved to the top left and was then divided by the determinant 10, giving 0.3."
                hints={[
                    "Find the determinant first, then decide which entry ends up in the top-left position.",
                    "The determinant is 6 x 3 - 2 x 4 = 10, and the swap sends the 3 to the top left. Now do the divide step.",
                    "3 divided by 10 is 0.3. Answering 3 means the divide step was skipped. Set the builder above to 6, 2, 4, 3 and press step 3.",
                ]}
            />
        </Block>
    </StackLayout>,
];
