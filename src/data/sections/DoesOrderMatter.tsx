import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH2, EditableH3, EditableParagraph, InlineFormula } from "@/components/atoms";
import { FormulaBlock } from "@/components/molecules";
import { OrderOfTransformations } from "./visuals/OrderOfTransformations";
import { ChoiceQuestion, NumericQuestion } from "./practice/PracticeQuestions";

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
                <InlineFormula latex="4 \times 7" /> agree. A matrix can turn or
                stretch a shape on a grid, much like a move in a game character
                editor, so try the same two moves in each order below.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-order-visual" maxWidth="xl">
        <Block id="order-visual" padding="sm" hasVisualization>
            <OrderOfTransformations />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-order-summary" maxWidth="xl">
        <Block id="order-summary" padding="sm">
            <EditableParagraph id="para-order-summary" blockId="order-summary">
                The two flags end up in different places, and the two product
                matrices underneath them are different too. Swapping the
                matrices swaps which rows meet which columns, so{" "}
                <InlineFormula latex="AB" /> and{" "}
                <InlineFormula latex="BA" /> are two separate calculations.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-order-practice-heading" maxWidth="xl">
        <Block id="order-practice-heading" padding="sm">
            <EditableH3 id="h3-order-practice-heading" blockId="order-practice-heading">
                Your turn
            </EditableH3>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-order-practice-matrices" maxWidth="xl">
        <Block id="order-practice-matrices" padding="lg">
            <FormulaBlock latex="A = \begin{pmatrix} 1 & 2 \\ 0 & 1 \end{pmatrix} \qquad B = \begin{pmatrix} 1 & 0 \\ 3 & 1 \end{pmatrix}" />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-order-practice-entry-prompt" maxWidth="xl">
        <Block id="order-practice-entry-prompt" padding="sm">
            <EditableParagraph
                id="para-order-practice-entry-prompt"
                blockId="order-practice-entry-prompt"
            >
                The top-left entry of <InlineFormula latex="AB" /> is 7. What is
                the top-left entry of <InlineFormula latex="BA" />?
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-order-practice-entry" maxWidth="xl">
        <Block id="order-practice-entry" padding="sm">
            <NumericQuestion
                answer={1}
                placeholder="Top-left entry"
                successFeedback="Correct. Row 1 of B is (1, 0) meeting column 1 of A, which gives 1. The same two matrices in the other order gave 7, so AB and BA really are different."
                hints={[
                    "Not quite. For BA, the matrix on the left is B, so the top-left entry comes from row 1 of B meeting column 1 of A.",
                    "Row 1 of B is (1, 0). Column 1 of A is (1, 0) read downwards. Multiply the pairs and add.",
                    "It is 1 x 1 + 0 x 0 = 1. Answering 7 would mean assuming BA repeats AB, and the two flags above show why that assumption fails.",
                ]}
            />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-order-practice-statement-prompt" maxWidth="xl">
        <Block id="order-practice-statement-prompt" padding="sm">
            <EditableParagraph
                id="para-order-practice-statement-prompt"
                blockId="order-practice-statement-prompt"
            >
                A designer turns a logo a quarter turn and then stretches it
                sideways. A colleague stretches the same logo first and then
                turns it. Which statement is true?
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-order-practice-statement" maxWidth="xl">
        <Block id="order-practice-statement" padding="sm">
            <ChoiceQuestion
                options={[
                    {
                        id: "usually-different",
                        label: "The two logos usually end up different, because the order of the matrices changes the product",
                        correct: true,
                        feedback:
                            "Right. The order decides which rows meet which columns, so the two products, and the two logos, are generally different.",
                    },
                    {
                        id: "always-same",
                        label: "The two logos are identical, because multiplication order never matters",
                        feedback:
                            "That rule holds for ordinary numbers, not for matrices. Press the step buttons above and compare the two flags after both steps.",
                    },
                    {
                        id: "never-same",
                        label: "The two logos can never be the same for any pair of matrices",
                        feedback:
                            "Too strong. Order usually matters, but some special pairs do agree, such as a matrix multiplied by the one that undoes it, which is coming up later in this lesson.",
                    },
                ]}
            />
        </Block>
    </StackLayout>,
];
