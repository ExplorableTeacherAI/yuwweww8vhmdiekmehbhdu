import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH2, EditableH3, EditableParagraph, InlineFormula } from "@/components/atoms";
import { MatrixSizeMatcher } from "./visuals/MatrixSizeMatcher";
import { ChoiceQuestion } from "./practice/PracticeQuestions";

export const whenCanYouMultiplyBlocks: ReactElement[] = [
    <StackLayout key="layout-size-rule-heading" maxWidth="xl">
        <Block id="size-rule-heading" padding="md">
            <EditableH2 id="h2-size-rule-heading" blockId="size-rule-heading">
                When Can You Multiply?
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-size-rule-idea" maxWidth="xl">
        <Block id="size-rule-idea" padding="sm">
            <EditableParagraph id="para-size-rule-idea" blockId="size-rule-idea">
                A row can only meet a column if they hold the same count of
                numbers. Three sales figures need three prices; three sales
                figures and four prices leave a number with no partner. Drag the
                sliders below and find out which pairs of matrices fit together.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-size-rule-visual" maxWidth="xl">
        <Block id="size-rule-visual" padding="sm" hasVisualization>
            <MatrixSizeMatcher />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-size-rule-summary" maxWidth="xl">
        <Block id="size-rule-summary" padding="sm">
            <EditableParagraph id="para-size-rule-summary" blockId="size-rule-summary">
                The two touching edges are the columns of the first matrix and
                the rows of the second, and they must be equal. The outer edges
                survive into the answer, so a{" "}
                <InlineFormula latex="2 \times 3" /> times a{" "}
                <InlineFormula latex="3 \times 4" /> gives a{" "}
                <InlineFormula latex="2 \times 4" />. Write both sizes down
                before you calculate anything.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-size-rule-practice-heading" maxWidth="xl">
        <Block id="size-rule-practice-heading" padding="sm">
            <EditableH3 id="h3-size-rule-practice-heading" blockId="size-rule-practice-heading">
                Your turn
            </EditableH3>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-size-rule-practice-size-prompt" maxWidth="xl">
        <Block id="size-rule-practice-size-prompt" padding="sm">
            <EditableParagraph
                id="para-size-rule-practice-size-prompt"
                blockId="size-rule-practice-size-prompt"
            >
                A <InlineFormula latex="4 \times 2" /> matrix is multiplied by a{" "}
                <InlineFormula latex="2 \times 5" /> matrix. What size is the
                answer?
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-size-rule-practice-size" maxWidth="xl">
        <Block id="size-rule-practice-size" padding="sm">
            <ChoiceQuestion
                options={[
                    {
                        id: "four-by-five",
                        label: <InlineFormula latex="4 \times 5" />,
                        correct: true,
                        feedback:
                            "Correct. The inner 2s matched, so the product exists, and the outer numbers 4 and 5 became the size of the answer.",
                    },
                    {
                        id: "two-by-two",
                        label: <InlineFormula latex="2 \times 2" />,
                        feedback:
                            "Those are the two inner numbers. They decide whether you may multiply, not how big the answer is. Set the sliders above to 4 x 2 and 2 x 5 and look at the answer shape.",
                    },
                    {
                        id: "five-by-four",
                        label: <InlineFormula latex="5 \times 4" />,
                        feedback:
                            "Right numbers, wrong way round. The rows always come from the first matrix. Check the line under the answer shape above.",
                    },
                    {
                        id: "impossible",
                        label: "These cannot be multiplied",
                        feedback:
                            "Look again at the touching edges: the columns of the first and the rows of the second. Set the sliders to 4 x 2 and 2 x 5 and see whether they lock together.",
                    },
                ]}
            />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-size-rule-practice-possible-prompt" maxWidth="xl">
        <Block id="size-rule-practice-possible-prompt" padding="sm">
            <EditableParagraph
                id="para-size-rule-practice-possible-prompt"
                blockId="size-rule-practice-possible-prompt"
            >
                Which one of these products can actually be worked out?
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-size-rule-practice-possible" maxWidth="xl">
        <Block id="size-rule-practice-possible" padding="sm">
            <ChoiceQuestion
                options={[
                    {
                        id: "three-one-times-one-four",
                        label: (
                            <span>
                                a <InlineFormula latex="3 \times 1" /> matrix times a{" "}
                                <InlineFormula latex="1 \times 4" /> matrix
                            </span>
                        ),
                        correct: true,
                        feedback:
                            "Yes. The touching edges are both 1, so each row of one number meets each column of one number, and the answer is 3 x 4.",
                    },
                    {
                        id: "same-size-pair",
                        label: (
                            <span>
                                a <InlineFormula latex="2 \times 4" /> matrix times a{" "}
                                <InlineFormula latex="2 \times 4" /> matrix
                            </span>
                        ),
                        feedback:
                            "Equal sizes let you add two matrices, but multiplying needs the columns of the first to match the rows of the second: here 4 against 2. Try those sliders above and watch the gap appear.",
                    },
                    {
                        id: "mismatched-inner",
                        label: (
                            <span>
                                a <InlineFormula latex="3 \times 2" /> matrix times a{" "}
                                <InlineFormula latex="3 \times 2" /> matrix
                            </span>
                        ),
                        feedback:
                            "Check the inner numbers only: 2 against 3. One number in every row would be left without a partner. Set this pair on the sliders above to see it.",
                    },
                ]}
            />
        </Block>
    </StackLayout>,
];
