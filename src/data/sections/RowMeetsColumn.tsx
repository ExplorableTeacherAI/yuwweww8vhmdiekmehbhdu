import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH2, EditableH3, EditableParagraph, InlineFormula } from "@/components/atoms";
import { RowColumnProduct } from "./visuals/RowColumnProduct";
import { ChoiceQuestion, NumericQuestion } from "./practice/PracticeQuestions";

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
                The prices are 30, 25 and 40 rupees, so the takings are{" "}
                <InlineFormula latex="20 \times 30 + 15 \times 25 + 8 \times 40 = 1295" />.
                That single number is one entry of a matrix product: a whole row
                meeting a whole column, multiplied pair by pair and then added.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-row-column-visual" maxWidth="xl">
        <Block id="row-column-visual" padding="sm" hasVisualization>
            <RowColumnProduct />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-row-column-rule" maxWidth="xl">
        <Block id="row-column-rule" padding="sm">
            <EditableParagraph id="para-row-column-rule" blockId="row-column-rule">
                Click any entry of the answer and watch which row and which
                column light up: the entry in row 2, column 1 always comes from
                row 2 of the sales and column 1 of the prices. Adding matrices
                pairs up matching positions; multiplying them never does.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-row-column-practice-heading" maxWidth="xl">
        <Block id="row-column-practice-heading" padding="sm">
            <EditableH3 id="h3-row-column-practice-heading" blockId="row-column-practice-heading">
                Your turn
            </EditableH3>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-row-column-practice-choice-prompt" maxWidth="xl">
        <Block id="row-column-practice-choice-prompt" padding="sm">
            <EditableParagraph
                id="para-row-column-practice-choice-prompt"
                blockId="row-column-practice-choice-prompt"
            >
                A tuck shop sells 12 teas and 9 coffees one morning. Tea costs
                20 rupees and coffee costs 35. Which calculation gives the
                morning's takings?
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-row-column-practice-choice" maxWidth="xl">
        <Block id="row-column-practice-choice" padding="sm">
            <ChoiceQuestion
                options={[
                    {
                        id: "sum-of-products",
                        label: <InlineFormula latex="12 \times 20 + 9 \times 35" />,
                        correct: true,
                        feedback:
                            "Exactly right. Each quantity meets the price of its own item, and the products are added into one number, which is what a row meeting a column does.",
                    },
                    {
                        id: "separate-products",
                        label: (
                            <span>
                                Two separate answers:{" "}
                                <InlineFormula latex="12 \times 20" /> and{" "}
                                <InlineFormula latex="9 \times 35" />
                            </span>
                        ),
                        feedback:
                            "That is the addition habit: multiplying matching positions and leaving them apart. A row meeting a column gives one number, not a list. Click an entry in the panel above and count how many products are added to build it.",
                    },
                    {
                        id: "crossed-pairs",
                        label: <InlineFormula latex="12 \times 9 + 20 \times 35" />,
                        feedback:
                            "Check what is being paired here: two quantities are multiplied together, and two prices are multiplied together. Look at the working line above and see what sits on each side of every multiplication sign.",
                    },
                ]}
            />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-row-column-practice-numeric-prompt" maxWidth="xl">
        <Block id="row-column-practice-numeric-prompt" padding="sm">
            <EditableParagraph
                id="para-row-column-practice-numeric-prompt"
                blockId="row-column-practice-numeric-prompt"
            >
                On Wednesday the canteen sells 14 rolls, 20 juices and 5
                samosas. Using the same price column as above, what are
                Wednesday's takings in rupees?
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-row-column-practice-numeric" maxWidth="xl">
        <Block id="row-column-practice-numeric" padding="sm">
            <NumericQuestion
                answer={1120}
                placeholder="Takings in Rs"
                successFeedback="Correct. You paired each quantity with the price of that item and added all three products, which is exactly one entry of a matrix product."
                hints={[
                    "Not yet. Pair each quantity with the price of the same item, then add the three products together.",
                    "Try it in pieces: 14 rolls at 30 gives 420. Now work out the juices and the samosas the same way and add all three.",
                    "The three products are 420, 500 and 200, so the takings are 1120. Click Monday's price entry above to compare the pattern.",
                ]}
            />
        </Block>
    </StackLayout>,
];
