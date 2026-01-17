
import nltk
from nltk.stem import PorterStemmer, WordNetLemmatizer
from nltk.tokenize import word_tokenize
from nltk import pos_tag

# Ensure necessary NLTK data is downloaded
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt')

try:
    nltk.data.find('corpora/wordnet')
except LookupError:
    nltk.download('wordnet')

try:
    nltk.data.find('taggers/averaged_perceptron_tagger')
except LookupError:
    nltk.download('averaged_perceptron_tagger')


class NLPProcessor:
    """
    A class to process a paragraph of text and perform NLP tasks like
    tokenization, stemming, lemmatization, and POS tagging.
    """

    def __init__(self):
        """
        Initializes the NLPProcessor with stemmer and lemmatizer.
        """
        self.stemmer = PorterStemmer()
        self.lemmatizer = WordNetLemmatizer()

    def take_input(self, paragraph: str) -> str:
        """
        Takes a paragraph as input.

        Args:
            paragraph (str): The input paragraph of text.

        Returns:
            str: The input paragraph.
        """
        return paragraph

    def split_into_words(self, paragraph: str) -> list[str]:
        """
        Splits the input paragraph into individual words using NLTK's word_tokenize.

        Args:
            paragraph (str): The input paragraph.

        Returns:
            list[str]: A list of words (tokens) extracted from the paragraph.
        """
        return word_tokenize(paragraph)

    def find_stemmed_word(self, words: list[str]) -> list[str]:
        """
        Finds the stemmed form of each word in the input list.

        Args:
            words (list[str]): A list of words to stem.

        Returns:
            list[str]: A list of stemmed words.
        """
        return [self.stemmer.stem(word) for word in words]

    def find_lemmatized_word(self, words: list[str]) -> list[str]:
        """
        Finds the lemmatized form of each word in the input list.

        Args:
            words (list[str]): A list of words to lemmatize.

        Returns:
            list[str]: A list of lemmatized words.
        """
        return [self.lemmatizer.lemmatize(word) for word in words]

    def find_part_of_speech(self, words: list[str]) -> list[tuple[str, str]]:
        """
        Finds the Part-of-Speech (POS) tag for each word in the input list.

        Args:
            words (list[str]): A list of words to tag.

        Returns:
            list[tuple[str, str]]: A list of tuples, where each tuple contains a word and its POS tag.
        """
        return pos_tag(words)

    def process_paragraph(self, paragraph: str) -> dict:
        """
        Processes the input paragraph through the NLP pipeline.

        Args:
            paragraph (str): The input paragraph.

        Returns:
            dict: A dictionary containing the results of tokenization, stemming, lemmatization, and POS tagging.
        """
        words = self.split_into_words(paragraph)
        stemmed_words = self.find_stemmed_word(words)
        lemmatized_words = self.find_lemmatized_word(words)
        pos_tags = self.find_part_of_speech(words)

        return {
            "tokens": words,
            "stemmed_words": stemmed_words,
            "lemmatized_words": lemmatized_words,
            "pos_tags": pos_tags,
        }


if __name__ == "__main__":
    # Example usage
    processor = NLPProcessor()
    paragraph = "The quick brown foxes are jumping over the lazy dogs. Running is fun, and connections are important."

    results = processor.process_paragraph(paragraph)

    print("Original Paragraph:", paragraph)
    print("\nTokens:", results["tokens"])
    print("\nStemmed Words:", results["stemmed_words"])
    print("\nLemmatized Words:", results["lemmatized_words"])
    print("\nPOS Tags:", results["pos_tags"])

