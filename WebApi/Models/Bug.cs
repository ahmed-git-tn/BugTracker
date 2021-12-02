using BugTracker.Models.Enum;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace BugTracker.Models
{
    [Table("Bugs")]
    public class Bug
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50, ErrorMessage= "Bug title must be 50 characters or less"),
         MinLength(4, ErrorMessage= "Bug title must be 4 characters or more")]
        public string Title { get; set; }

        [MaxLength(200, ErrorMessage="Bug title must be 200 characters or less")]
        public string Description { get; set; } = string.Empty;
      
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public State State { get; set; } = State.New;

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public Priority Priority { get; set; } = Priority.Low;

        private string _createdOn = DateTime.Now.ToString("d");
     
        public string CreatedOn { get => _createdOn; }  
        public string ApplicationUserId { get; set; }
        public ApplicationUser ApplicationUser { get; set; }

        public Bug(string title, string description, State state, Priority priority)
        {

            Title = title;
            Description = description;
            State = state;
            Priority = priority;
        }

    }
}
