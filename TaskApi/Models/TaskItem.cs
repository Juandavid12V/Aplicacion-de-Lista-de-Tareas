namespace TaskApi.Models
{
  public class TaskItem
{
    public int Id { get; set; }
    public string Text { get; set; } = string.Empty;
    public bool Done { get; set; }
    public DateTime CreatedAt { get; set; }

    public string CreatedAtFormatted => CreatedAt.ToString("yyyy-MM-ddTHH:mm:ssZ");
}

}
