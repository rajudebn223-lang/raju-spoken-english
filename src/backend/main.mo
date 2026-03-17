import Text "mo:core/Text";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Order "mo:core/Order";

actor {
  type Lesson = {
    title : Text;
    description : Text;
    category : Text;
    duration : Nat;
    level : Text;
    rating : Float;
  };

  module Lesson {
    public func compareByRating(l1 : Lesson, l2 : Lesson) : Order.Order {
      if (l1.rating < l2.rating) { #less } else if (l1.rating > l2.rating) {
        #greater;
      } else { Text.compare(l1.title, l2.title) };
    };

    public func compare(lesson1 : Lesson, lesson2 : Lesson) : Order.Order {
      Text.compare(lesson1.title, lesson2.title);
    };
  };

  type Phrase = {
    phrase : Text;
    category : Text;
  };

  module Phrase {
    public func compare(phrase1 : Phrase, phrase2 : Phrase) : Order.Order {
      Text.compare(phrase1.phrase, phrase2.phrase);
    };

    public func compareByCategory(p1 : Phrase, p2 : Phrase) : Order.Order {
      Text.compare(p1.category, p2.category);
    };
  };

  type GrammarTip = {
    title : Text;
    content : Text;
    category : Text;
  };

  module GrammarTip {
    public func compareByCategory(gt1 : GrammarTip, gt2 : GrammarTip) : Order.Order {
      Text.compare(gt1.category, gt2.category);
    };

    public func compare(grammartip1 : GrammarTip, grammartip2 : GrammarTip) : Order.Order {
      Text.compare(grammartip1.title, grammartip2.title);
    };
  };

  type Testimonial = {
    studentName : Text;
    message : Text;
    rating : Nat;
  };

  module Testimonial {
    public func compare(testimonial1 : Testimonial, testimonial2 : Testimonial) : Order.Order {
      Text.compare(testimonial1.studentName, testimonial2.studentName);
    };
  };

  let lessons = [
    {
      title = "Basic Greetings";
      description = "Learn common English greetings";
      category = "Beginner";
      duration = 30;
      level = "Easy";
      rating = 4.5;
    },
    {
      title = "Business English";
      description = "Improve your business vocabulary";
      category = "Intermediate";
      duration = 45;
      level = "Medium";
      rating = 4.7;
    },
    {
      title = "Travel Phrases";
      description = "Essential phrases for traveling";
      category = "Beginner";
      duration = 25;
      level = "Easy";
      rating = 4.3;
    },
    {
      title = "Advanced Conversation";
      description = "Master advanced conversation skills";
      category = "Advanced";
      duration = 60;
      level = "Hard";
      rating = 4.8;
    },
  ];

  let phrases = [
    {
      phrase = "How are you?";
      category = "Greetings";
    },
    {
      phrase = "Where is the nearest hotel?";
      category = "Travel";
    },
    {
      phrase = "Could you repeat that please?";
      category = "General";
    },
    {
      phrase = "It's a pleasure to meet you.";
      category = "Business";
    },
  ];

  let grammarTips = [
    {
      title = "Present Simple Tense";
      content = "Use present simple for routines and facts.";
      category = "Beginner";
    },
    {
      title = "Past Continuous Tense";
      content = "Use past continuous for ongoing past actions.";
      category = "Intermediate";
    },
    {
      title = "Conditional Sentences";
      content = "Use if-clauses for possibilities and hypothetical situations.";
      category = "Advanced";
    },
  ];

  let testimonials = [
    {
      studentName = "Raju";
      message = "The lessons are clear and easy to follow!";
      rating = 5;
    },
    {
      studentName = "Anita";
      message = "I improved my business English with this course.";
      rating = 4;
    },
    {
      studentName = "Sunil";
      message = "Very helpful for travel and daily conversations.";
      rating = 5;
    },
  ];

  public query ({ caller }) func getLessons(category : ?Text) : async [Lesson] {
    switch (category) {
      case (null) { lessons };
      case (?cat) {
        lessons.filter(
          func(lesson) {
            Text.equal(lesson.category, cat);
          }
        );
      };
    };
  };

  public query ({ caller }) func getPhrases(category : ?Text) : async [Phrase] {
    switch (category) {
      case (null) { phrases };
      case (?cat) {
        phrases.filter(
          func(phrase) {
            Text.equal(phrase.category, cat);
          }
        );
      };
    };
  };

  public query ({ caller }) func getGrammarTips(category : ?Text) : async [GrammarTip] {
    switch (category) {
      case (null) { grammarTips };
      case (?cat) {
        grammarTips.filter(
          func(tip) {
            Text.equal(tip.category, cat);
          }
        );
      };
    };
  };

  public query ({ caller }) func getTestimonials() : async [Testimonial] {
    testimonials;
  };

  public query ({ caller }) func getAllLessonsByRating() : async [Lesson] {
    lessons.values().toArray().sort(Lesson.compareByRating);
  };

  public query ({ caller }) func getAllPhrasesByCategory() : async [Phrase] {
    phrases.values().toArray().sort(Phrase.compareByCategory);
  };

  public query ({ caller }) func getAllGrammarTipsByCategory() : async [GrammarTip] {
    grammarTips.values().toArray().sort(GrammarTip.compareByCategory);
  };
};
