using BugTracker.Models.Enum;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BugTracker.Models.DTOs
{
    public class BugDto
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(50, ErrorMessage = "Bug title must be 50 characters or less"),
         MinLength(4, ErrorMessage = "Bug title must be 4 characters or more")]
        public string Title { get; set; }

        [MaxLength(200, ErrorMessage = "Bug title must be 200 characters or less")]
        public string Description { get; set; } = string.Empty;

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public State State { get; set; } = State.New;

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public Priority Priority { get; set; } = Priority.Low;


        public BugDto(int id ,string title, string description, State state, Priority priority)
        {
            Id = id;
            Title = title;
            Description = description;
            State = state;
            Priority = priority;
        }
    }
}
