import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH2, EditableH3, EditableParagraph, InlineFormula } from "@/components/atoms";
import { FormulaBlock } from "@/components/molecules";
import { DeterminantDiagonals } from "./visuals/DeterminantDiagonals";
import { NumericQuestion } from "./practice/PracticeQuestions";

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
        <Block id="determinant-visual" padding="sm" hasVisualization>
            <DeterminantDiagonals />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-determinant-summary" maxWidth="xl">
        <Block id="determinant-summary" padding="sm">
            <EditableParagraph id="para-determinant-summary" blockId="determinant-summary">
                Multiply along the solid diagonal, multiply along the dashed
                one, then subtract in that order. Move the sliders until the two
                products are equal and the determinant lands on zero: those
                matrices behave very differently from the rest, as you are about
                to see.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-determinant-practice-heading" maxWidth="xl">
        <Block id="determinant-practice-heading" padding="sm">
            <EditableH3 id="h3-determinant-practice-heading" blockId="determinant-practice-heading">
                Your turn
            </EditableH3>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-determinant-practice-value-prompt" maxWidth="xl">
        <Block id="determinant-practice-value-prompt" padding="sm">
            <EditableParagraph
                id="para-determinant-practice-value-prompt"
                blockId="determinant-practice-value-prompt"
            >
                What is the determinant of the matrix with top row{" "}
                <InlineFormula latex="(5, -3)" /> and bottom row{" "}
                <InlineFormula latex="(2, 4)" />?
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-determinant-practice-value" maxWidth="xl">
        <Block id="determinant-practice-value" padding="sm">
            <NumericQuestion
                answer={26}
                placeholder="Determinant"
                successFeedback="Correct. The solid diagonal gives 20, the dashed one gives -6, and subtracting a negative pushes the determinant up to 26."
                hints={[
                    "Not yet. Work out both products first: a times d, then b times c, keeping the minus sign with the -3.",
                    "You should have 5 x 4 = 20 and (-3) x 2 = -6. Now do 20 minus (-6) and watch that double negative.",
                    "20 - (-6) = 26. Set the sliders above to 5, -3, 2 and 4 and compare the two coloured products.",
                ]}
            />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-determinant-practice-zero-prompt" maxWidth="xl">
        <Block id="determinant-practice-zero-prompt" padding="sm">
            <EditableParagraph
                id="para-determinant-practice-zero-prompt"
                blockId="determinant-practice-zero-prompt"
            >
                A matrix has top row <InlineFormula latex="(k, 6)" /> and bottom
                row <InlineFormula latex="(2, 4)" />. What value of{" "}
                <InlineFormula latex="k" /> makes its determinant zero?
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-determinant-practice-zero" maxWidth="xl">
        <Block id="determinant-practice-zero" padding="sm">
            <NumericQuestion
                answer={3}
                placeholder="Value of k"
                successFeedback="Correct. With k = 3 both diagonals give 12, so the determinant is zero and the top row is exactly 1.5 times the bottom row."
                hints={[
                    "A determinant of zero means the two diagonal products are equal. Write both products in terms of k.",
                    "The solid diagonal gives 4k and the dashed one gives 12. Now solve 4k = 12.",
                    "k = 3. Set the sliders above to 3, 6, 2, 4 and watch the zero-determinant message appear.",
                ]}
            />
        </Block>
    </StackLayout>,
];
